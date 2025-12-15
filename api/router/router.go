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
	websitesRouter := router.PathPrefix("/websites").Subrouter()
	websitesRouter.Use(middleware.AuthMiddleware)

	websitesRouter.HandleFunc("", websiteHandlers.CreateWebsiteHandler).Methods("POST")
	websitesRouter.HandleFunc("", websiteHandlers.GetWebsitesHandler).Methods("GET")
	websitesRouter.HandleFunc("/{websiteId}", websiteHandlers.GetWebsiteHandler).Methods("GET")
	websitesRouter.HandleFunc("/{websiteId}", websiteHandlers.DeleteWebsiteHandler).Methods("DELETE")
	websitesRouter.HandleFunc("/{websiteId}", websiteHandlers.UpdateWebsiteHandler).Methods("PATCH")

	authRouter := router.PathPrefix("/auth").Subrouter()
	authRouter.HandleFunc("/login", authHandlers.LoginHandler).Methods("POST")

	return router
}
