package handlers

import (
	"encoding/json"
	"net/http"
)

type Content struct {
	Type     string    `json:"type"`
	ID       string    `json:"id,omitempty"`
	Value    string    `json:"value"`
	Path     string    `json:"path,omitempty"`
	Elements []Content `json:"elements,omitempty"`
}

type WebsiteDto struct {
	ID      int       `json:"id"`
	Name    string    `json:"name"`
	Content []Content `json:"content"`
}

func GetWebsiteHandler(w http.ResponseWriter, r *http.Request) {
	// TODO: move it to database
	var website WebsiteDto = WebsiteDto{
		ID:   1,
		Name: "Website 1",
		Content: []Content{
			{
				Type:  "text",
				ID:    "cmsText1",
				Value: "BurgerHouse",
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
				Elements: []Content{
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
				Elements: []Content{
					{
						Type: "container",
						Elements: []Content{
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
				Elements: []Content{
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

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(website)
}
