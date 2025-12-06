package handlers

import (
	"api/models"
	"api/repositories"
	"net/http"

	"github.com/gorilla/mux"
)

func UpdateWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	websiteId := vars["websiteId"]

	var updatedWebsite = models.Website{
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

	err := repositories.UpdateWebsiteById(websiteId, updatedWebsite)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Website updated"))
}
