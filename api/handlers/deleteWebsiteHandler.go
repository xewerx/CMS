package handlers

import (
	"api/repositories"
	"net/http"

	"github.com/gorilla/mux"
)

func DeleteWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	websiteId := vars["websiteId"]

	err := repositories.DeleteWebsiteById(websiteId)
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
