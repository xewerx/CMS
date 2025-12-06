package router

import (
	"net/http"

	"github.com/gorilla/mux"

	"api/handlers"
	middleware "api/middlewares"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	// Middlewares
	router.Use(middleware.LoggingMiddleware)
	router.Use(middleware.CorsMiddleware)

	// For preflight OPTIONS request
	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Routes
	router.HandleFunc("/websites", handlers.CreateWebsiteHandler).Methods("POST")
	router.HandleFunc("/websites/{websiteId}", handlers.GetWebsiteHandler).Methods("GET")
	router.HandleFunc("/websites/{websiteId}", handlers.DeleteWebsiteHandler).Methods("DELETE")
	router.HandleFunc("/websites/{websiteId}", handlers.UpdateWebsiteHandler).Methods("PATCH")

	return router
}
