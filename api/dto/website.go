package dto

type Content struct {
	Type     string    `json:"type" validate:"required,oneof=text image list container"`
	ID       string    `json:"id,omitempty"`
	Value    string    `json:"value"`
	Path     string    `json:"path,omitempty"`
	Elements []Content `json:"elements,omitempty" validate:"dive,content"`
}

type UpdateWebsiteDto struct {
	Name      string    `json:"name" validate:"required,min=3"`
	Content   []Content `json:"content" validate:"required,dive,content"`
	Redactors []string  `json:"redactors" validate:"required,min=1,dive,required"`
}

type CreateWebsiteDto struct {
	Name      string    `json:"name" validate:"required,min=3"`
	Content   []Content `json:"content" validate:"required,dive,content"`
	Redactors []string  `json:"redactors" validate:"required,min=1,dive,required"`
}

type GetWebsitesDto struct {
	ID   string `json:"id,omitempty"`
	Name string `json:"name"`
}
