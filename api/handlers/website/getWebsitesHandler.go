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

	websites, err := repositories.GetWebsitesByUserId(userId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	websitesDto := make([]dto.GetWebsitesDto, len(websites))
	for i, website := range websites {
		websitesDto[i] = dto.GetWebsitesDto{
			ID:   website.ID,
			Name: website.Name,
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(websitesDto)
}
