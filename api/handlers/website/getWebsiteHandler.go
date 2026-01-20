package websiteHandlers

import (
	"api/models"
	"api/repositories"

	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

func GetWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	websiteId := vars["websiteId"]

	// Get language query parameter (default to "en" if not specified)
	language := r.URL.Query().Get("language")
	if language == "" {
		language = "en"
	}

	website, err := repositories.GetWebsiteByIdWithLanguage(websiteId, language)

	if err != nil {
		if err == repositories.ErrNotFound {
			http.Error(w, "Website not found", http.StatusNotFound)
			return
		}
		if err == repositories.ErrInvalidObjectId {
			http.Error(w, "Website not found", http.StatusNotFound)
			return
		}

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	websiteDto := models.ToWebsiteDto(website)

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(websiteDto)
}
