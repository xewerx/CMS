package handlers

import (
	"api/dto"
	"api/repositories"

	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
)

// TODO: move it to database
var website dto.WebsiteDto = dto.WebsiteDto{
	ID:   1,
	Name: "Website 1",
	Content: []dto.Content{
		{
			Type:  "text",
			ID:    "cmsText1",
			Value: "BurgerHousee",
		},
		{
			Type:  "image",
			ID:    "cmsImage1",
			Value: "images/hero-bg.jpg",
		},
		{
			Type: "list",
			ID:   "cmsHeaderNav",
			Path: "li > a",
			Elements: []dto.Content{
				{
					Type:  "text",
					Value: "Home",
				},
				{
					Type:  "text",
					Value: "Home",
				},
				{
					Type:  "text",
					Value: "Menu",
				},
				{
					Type:  "text",
					Value: "About",
				},
				{
					Type:  "text",
					Value: "Home Book",
				},
				{
					Type:  "text",
					Value: "Home Book2",
				},
			},
		},
		{
			Type: "list",
			ID:   "cmsFoodList",
			Path: "div > .box > div",
			Elements: []dto.Content{
				{
					Type: "container",
					Elements: []dto.Content{
						{
							Type:  "image",
							Value: "images/f2.png",
							Path:  "div > img",
						},
						{
							Type:  "text",
							Value: "DELICIOUS PIZZA",
							Path:  "div > h5",
						},
						{
							Type:  "text",
							Value: "PYSZNY BURGER",
							Path:  "div > p",
						},
						{
							Type:  "text",
							Value: "$2202",
							Path:  "div > h6",
						},
					},
				},
			},
		},
		{
			Type: "container",
			ID:   "cmsContactDetails",
			Elements: []dto.Content{
				{
					Type:  "text",
					Value: "Contact Us Bro",
					Path:  "h4",
				},
				{
					Type:  "text",
					Value: "Location here",
					Path:  "div > a > span",
				},
				{
					Type:  "text",
					Value: "Call here +01 1234567890",
					Path:  "div > a > span",
				},
				{
					Type:  "text",
					Value: "email@gmail.com",
					Path:  "div > a > span",
				},
			},
		},
	},
}

func GetWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	websiteId := vars["websiteId"]

	website, err := repositories.GetWebsiteById(websiteId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(website)
}
