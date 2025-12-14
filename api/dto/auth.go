package dto

type LoginDto struct {
	Login    string `json:"login" validate:"required,min=3,max=255"`
	Password string `json:"password" validate:"required,min=8,max=255"`
}
