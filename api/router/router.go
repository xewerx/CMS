package router

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"

	"api/handlers"
	"api/middleware"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()

	// Middlewares
	fmt.Println("Adding Logging Middleware")
	router.Use(middleware.LoggingMiddleware)
	router.Use(middleware.CorsMiddleware)

	// For preflight OPTIONS request
	router.Methods("OPTIONS").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	// Routes
	router.HandleFunc("/websites/{websiteId}", handlers.GetWebsiteHandler).Methods("GET")

	return router
}
