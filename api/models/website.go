package models

import "time"

type Content struct {
	Type     string    `json:"type"`
	ID       string    `json:"id,omitempty"`
	Value    string    `json:"value"`
	Path     string    `json:"path,omitempty"`
	Elements []Content `json:"elements,omitempty"`
}

type Website struct {
	ID        string    `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string    `bson:"name" json:"name"`
	Content   []Content `bson:"content" json:"content"`
	Redactors []string  `bson:"redactors" json:"redactors"`
	CreatedAt time.Time `bson:"created_at" json:"created_at"`
	UpdatedAt time.Time `bson:"updated_at" json:"updated_at"`
}
