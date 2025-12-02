package router

import (
	"github.com/gorilla/mux"

	"api/handlers"
	"api/middleware"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	// Middlewares
	router.Use(middleware.LoggingMiddleware)

	// Routes
	router.HandleFunc("/websites/{websiteId}", handlers.GetWebsiteHandler).Methods("GET")

	return router
}
