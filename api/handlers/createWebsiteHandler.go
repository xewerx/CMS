package handlers

import (
	"api/models"
	"api/repositories"
	"net/http"
)

func CreateWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	website := models.Website{
		Name: r.FormValue("name"),
		Content: []models.Content{
			{
				Type:  "text",
				ID:    "cmsText1",
				Value: "BurgerHousee",
			},
		},
		Redactors: []string{r.FormValue("redactors[0]")},
	}
	err := repositories.CreateWebsite(website)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Website created"))
}
