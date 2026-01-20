package repositories

import (
	"api/database"
	"api/dto"
	"api/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

func CreateWebsite(website models.Website) error {
	collection := database.MongoClient.Database("website").Collection("websites")
	_, err := collection.InsertOne(context.Background(), website)
	return err
}

func GetWebsiteById(id string) (models.Website, error) {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.Website{}, ErrInvalidObjectId
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	var website models.Website
	err = collection.FindOne(context.Background(), bson.M{"_id": objectId}).Decode(&website)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return models.Website{}, ErrNotFound
		}

		return models.Website{}, err
	}

	return website, nil
}

func DeleteWebsiteById(id string) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ErrInvalidObjectId
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": objectId})

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func UpdateWebsiteById(id string, website models.Website) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return ErrInvalidObjectId
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": objectId}, bson.M{"$set": website})

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return ErrNotFound
		}
		return err
	}

	return nil
}

func GetWebsitesByUserId(userId string) ([]models.Website, error) {
	collection := database.MongoClient.Database("website").Collection("websites")
	cursor, err := collection.Find(context.Background(), bson.M{"redactors": bson.M{"$in": []string{userId}}})
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var websites []models.Website
	for cursor.Next(context.Background()) {
		var website models.Website
		err = cursor.Decode(&website)
		if err != nil {
			return nil, err
		}
		websites = append(websites, website)
	}

	return websites, nil
}

// GetWebsiteByIdWithLanguage fetches website by ID, then finds version with requested language by name
func GetWebsiteByIdWithLanguage(id string, language string) (models.Website, error) {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.Website{}, ErrInvalidObjectId
	}

	collection := database.MongoClient.Database("website").Collection("websites")

	// First, get the website by ID to find its name
	var baseWebsite models.Website
	err = collection.FindOne(context.Background(), bson.M{"_id": objectId}).Decode(&baseWebsite)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return models.Website{}, ErrNotFound
		}
		return models.Website{}, err
	}

	// If no language specified or language matches, return the base website
	if language == "" || baseWebsite.Language == language {
		return baseWebsite, nil
	}

	// Otherwise, find the version with the requested language by name
	var website models.Website
	err = collection.FindOne(context.Background(), bson.M{
		"name":     baseWebsite.Name,
		"language": language,
	}).Decode(&website)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			// Return the base website if requested language doesn't exist
			return baseWebsite, nil
		}
		return models.Website{}, err
	}

	return website, nil
}

// GetWebsitesGroupedByName returns websites grouped by name with available languages
func GetWebsitesGroupedByName(userId string) ([]dto.GetWebsitesDto, error) {
	collection := database.MongoClient.Database("website").Collection("websites")

	// MongoDB aggregation pipeline to group websites by name
	pipeline := mongo.Pipeline{
		// Match websites where user is a redactor
		{{Key: "$match", Value: bson.M{"redactors": bson.M{"$in": []string{userId}}}}},
		// Group by name and collect languages
		{{Key: "$group", Value: bson.M{
			"_id":       "$name",
			"firstId":   bson.M{"$first": "$_id"},
			"name":      bson.M{"$first": "$name"},
			"languages": bson.M{"$addToSet": "$language"},
		}}},
		// Sort by name
		{{Key: "$sort", Value: bson.M{"name": 1}}},
	}

	cursor, err := collection.Aggregate(context.Background(), pipeline)
	if err != nil {
		return nil, err
	}
	defer cursor.Close(context.Background())

	var results []dto.GetWebsitesDto
	for cursor.Next(context.Background()) {
		var doc struct {
			FirstId   primitive.ObjectID `bson:"firstId"`
			Name      string             `bson:"name"`
			Languages []string           `bson:"languages"`
		}
		if err := cursor.Decode(&doc); err != nil {
			return nil, err
		}

		results = append(results, dto.GetWebsitesDto{
			ID:                 doc.FirstId.Hex(),
			Name:               doc.Name,
			AvailableLanguages: doc.Languages,
		})
	}

	return results, nil
}
