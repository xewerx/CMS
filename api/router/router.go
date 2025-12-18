package router

import (
	"net/http"

	"github.com/gorilla/mux"

	authHandlers "api/handlers/auth"
	websiteHandlers "api/handlers/website"
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
	publicWebsites := router.PathPrefix("/websites").Subrouter()
	publicWebsites.HandleFunc("/{websiteId}", websiteHandlers.GetWebsiteHandler).
		Methods("GET")

	protectedWebsites := router.PathPrefix("/websites").Subrouter()
	protectedWebsites.Use(middleware.AuthMiddleware)

	protectedWebsites.HandleFunc("", websiteHandlers.CreateWebsiteHandler).
		Methods("POST")
	protectedWebsites.HandleFunc("", websiteHandlers.GetWebsitesHandler).
		Methods("GET")
	protectedWebsites.HandleFunc("/{websiteId}", websiteHandlers.DeleteWebsiteHandler).
		Methods("DELETE")
	protectedWebsites.HandleFunc("/{websiteId}", websiteHandlers.UpdateWebsiteHandler).
		Methods("PATCH")

	authRouter := router.PathPrefix("/auth").Subrouter()
	authRouter.HandleFunc("/login", authHandlers.LoginHandler).Methods("POST")

	return router
}
