package main

import (
	"log"
	"net/http"

	"api/router"
)

func main() {
	router := router.NewRouter()

	log.Println("Server running on :8080")

	if err := http.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
