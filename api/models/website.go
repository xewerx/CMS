package models

import "time"

type Content struct {
	Type     string    `json:"type"`
	ID       string    `json:"id"`
	Value    string    `json:"value"`
	Path     string    `json:"path"`
	Elements []Content `json:"elements"`
}

type Website struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Content   []Content `json:"content"`
	Redactor  []string  `json:"redactor"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
