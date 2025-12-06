package main

import (
	"log"
	"net/http"
	"os"

	"api/database"
	"api/router"

	"github.com/joho/godotenv"
)

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	router := router.NewRouter()
	log.Println("Server running on port " + os.Getenv("PORT"))

	database.ConnectMongo(os.Getenv("MONGO_URL"))

	if err := http.ListenAndServe(":"+os.Getenv("PORT"), router); err != nil {
		log.Fatal(err)
	}
}
