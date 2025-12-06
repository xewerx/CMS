package repositories

import (
	"api/database"
	"api/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

func CreateWebsite(website models.Website) error {
	collection := database.MongoClient.Database("website").Collection("websites")
	_, err := collection.InsertOne(context.Background(), website)
	return err
}

func GetWebsiteById(id string) (models.Website, error) {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return models.Website{}, err
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	var website models.Website
	err = collection.FindOne(context.Background(), bson.M{"_id": objectId}).Decode(&website)
	return website, err
}

func DeleteWebsiteById(id string) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	_, err = collection.DeleteOne(context.Background(), bson.M{"_id": objectId})
	return err
}

func UpdateWebsiteById(id string, website models.Website) error {
	objectId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	collection := database.MongoClient.Database("website").Collection("websites")
	_, err = collection.UpdateOne(context.Background(), bson.M{"_id": objectId}, bson.M{"$set": website})
	return err
}
