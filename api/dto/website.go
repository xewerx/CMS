package dto

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
