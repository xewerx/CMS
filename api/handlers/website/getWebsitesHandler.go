package websiteHandlers

import (
	"encoding/json"
	"net/http"

	"api/dto"
	middleware "api/middlewares"
	"api/repositories"
)

func GetWebsitesHandler(w http.ResponseWriter, r *http.Request) {
	var userId = r.Context().Value(middleware.UserIdContextKey).(string)

	// Use aggregation to group websites by name and collect available languages
	websitesDto, err := repositories.GetWebsitesGroupedByName(userId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Handle nil slice case
	if websitesDto == nil {
		websitesDto = []dto.GetWebsitesDto{}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(websitesDto)
}
