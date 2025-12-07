package models

import (
	"api/dto"

	"time"
)

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

func FromCreateWebsiteDto(c dto.CreateWebsiteDto) Website {
	return Website{
		Name:      c.Name,
		Content:   FromContentList(c.Content),
		Redactors: c.Redactors,
		CreatedAt: time.Now(),
		UpdatedAt: time.Now(),
	}
}

func FromUpdateWebsiteDto(c dto.UpdateWebsiteDto) Website {
	return Website{
		Name:      c.Name,
		Content:   FromContentList(c.Content),
		Redactors: c.Redactors,
		UpdatedAt: time.Now(),
	}
}

func FromContent(c dto.Content) Content {
	var children []Content
	for _, e := range c.Elements {
		children = append(children, FromContent(e))
	}

	return Content{
		Type:     c.Type,
		ID:       c.ID,
		Value:    c.Value,
		Path:     c.Path,
		Elements: children,
	}
}

func FromContentList(list []dto.Content) []Content {
	out := make([]Content, 0)
	for _, c := range list {
		out = append(out, FromContent(c))
	}
	return out
}
