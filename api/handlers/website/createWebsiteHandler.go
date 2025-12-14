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
)

func CreateWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	websiteValidator := websiteValidation.GetCreateWebsiteValidator()

	var body dto.CreateWebsiteDto

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

	website := models.FromCreateWebsiteDto(body)

	err := repositories.CreateWebsite(website)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusNoContent)
}
