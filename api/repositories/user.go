package repositories

import (
	"api/database"
	"api/models"
	"context"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

func GetUserByLogin(login string) (models.User, error) {
	collection := database.MongoClient.Database("website").Collection("users")
	var user models.User
	err := collection.FindOne(context.Background(), bson.M{"login": login}).Decode(&user)

	if err != nil {
		if err == mongo.ErrNoDocuments {
			return models.User{}, ErrNotFound
		}

		return models.User{}, err
	}

	return user, nil
}

func CreateUser(user models.User) error {
	collection := database.MongoClient.Database("website").Collection("users")
	_, err := collection.InsertOne(context.Background(), user)
	if err != nil {
		return err
	}

	return nil
}
