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
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Website deleted"))
}
