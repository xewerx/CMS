package websiteHandlers

import (
	"api/dto"
	websiteValidation "api/handlers/website/validation"
	"api/models"
	"api/repositories"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

func UpdateWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	websiteId := vars["websiteId"]

	websiteValidator := websiteValidation.GetUpdateWebsiteValidator()

	var body dto.UpdateWebsiteDto

	if err := json.NewDecoder(r.Body).Decode(&body); err != nil {
		http.Error(w, "Invalid JSON body", http.StatusBadRequest)
		return
	}

	if err := websiteValidator.Struct(body); err != nil {
		validationErrors := err.(validator.ValidationErrors)

		messages := make([]string, 0)
		for _, e := range validationErrors {
			messages = append(messages, fmt.Sprintf("Field '%s' failed on '%s' rule", e.Field(), e.Tag()))
		}

		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]any{
			"errors": messages,
		})
		return
	}

	var updatedWebsite = models.FromUpdateWebsiteDto(body)

	err := repositories.UpdateWebsiteById(websiteId, updatedWebsite)
	if err != nil {
		if err == repositories.ErrNotFound {
			http.Error(w, "Website not found", http.StatusNotFound)
			return
		}

		if err == repositories.ErrInvalidObjectId {
			http.Error(w, "Invalid ObjectId", http.StatusBadRequest)
			return
		}

		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
