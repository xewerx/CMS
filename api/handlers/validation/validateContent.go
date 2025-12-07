package validation

import (
	"api/dto"

	"github.com/go-playground/validator/v10"
)

func ValidateContent(fl validator.FieldLevel) bool {
	content := fl.Field().Interface().(dto.Content)

	switch content.Type {
	case "text":
		return content.Value != ""
	case "image":
		return content.Value != ""
	case "list":
		return len(content.Elements) > 0
	case "container":
		return len(content.Elements) > 0
	default:
		return false
	}
}

func GetCreateWebsiteValidator() *validator.Validate {
	var validate = validator.New()
	validate.RegisterValidation("content", ValidateContent)
	return validate
}

func GetUpdateWebsiteValidator() *validator.Validate {
	var validate = validator.New()
	validate.RegisterValidation("content", ValidateContent)
	return validate
}
