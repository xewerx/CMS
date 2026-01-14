package websiteValidation

import (
	"api/dto"
	"testing"

	"github.com/go-playground/validator/v10"
	"github.com/stretchr/testify/assert"
)

func TestValidateContent_TextType(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name    string
		content dto.Content
		valid   bool
	}{
		{
			name:    "text with value is valid",
			content: dto.Content{Type: "text", Value: "Hello World"},
			valid:   true,
		},
		{
			name:    "text with empty value is invalid",
			content: dto.Content{Type: "text", Value: ""},
			valid:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(struct {
				Content dto.Content `validate:"content"`
			}{Content: tt.content})

			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
			}
		})
	}
}

func TestValidateContent_ImageType(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name    string
		content dto.Content
		valid   bool
	}{
		{
			name:    "image with value is valid",
			content: dto.Content{Type: "image", Value: "/images/photo.jpg"},
			valid:   true,
		},
		{
			name:    "image with empty value is invalid",
			content: dto.Content{Type: "image", Value: ""},
			valid:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(struct {
				Content dto.Content `validate:"content"`
			}{Content: tt.content})

			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
			}
		})
	}
}

func TestValidateContent_ListType(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name    string
		content dto.Content
		valid   bool
	}{
		{
			name: "list with elements is valid",
			content: dto.Content{
				Type: "list",
				Elements: []dto.Content{
					{Type: "text", Value: "Item 1"},
				},
			},
			valid: true,
		},
		{
			name:    "list with empty elements is invalid",
			content: dto.Content{Type: "list", Elements: []dto.Content{}},
			valid:   false,
		},
		{
			name:    "list with nil elements is invalid",
			content: dto.Content{Type: "list"},
			valid:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(struct {
				Content dto.Content `validate:"content"`
			}{Content: tt.content})

			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
			}
		})
	}
}

func TestValidateContent_ContainerType(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name    string
		content dto.Content
		valid   bool
	}{
		{
			name: "container with elements is valid",
			content: dto.Content{
				Type: "container",
				Elements: []dto.Content{
					{Type: "text", Value: "Title"},
					{Type: "image", Value: "/img.png"},
				},
			},
			valid: true,
		},
		{
			name:    "container with empty elements is invalid",
			content: dto.Content{Type: "container", Elements: []dto.Content{}},
			valid:   false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(struct {
				Content dto.Content `validate:"content"`
			}{Content: tt.content})

			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
			}
		})
	}
}

func TestValidateContent_InvalidType(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name    string
		content dto.Content
	}{
		{
			name:    "unknown type is invalid",
			content: dto.Content{Type: "unknown", Value: "test"},
		},
		{
			name:    "empty type is invalid",
			content: dto.Content{Type: "", Value: "test"},
		},
		{
			name:    "random type is invalid",
			content: dto.Content{Type: "video", Value: "test"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(struct {
				Content dto.Content `validate:"content"`
			}{Content: tt.content})

			assert.Error(t, err)
		})
	}
}

func TestValidateContent_NestedContent(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	t.Run("deeply nested valid content", func(t *testing.T) {
		content := dto.Content{
			Type: "container",
			Elements: []dto.Content{
				{
					Type: "list",
					Elements: []dto.Content{
						{Type: "text", Value: "Nested item"},
					},
				},
				{Type: "image", Value: "/nested.png"},
			},
		}

		err := validate.Struct(struct {
			Content dto.Content `validate:"content"`
		}{Content: content})

		assert.NoError(t, err)
	})
}

func TestCreateWebsiteDto_Validation(t *testing.T) {
	validate := GetCreateWebsiteValidator()

	tests := []struct {
		name  string
		dto   dto.CreateWebsiteDto
		valid bool
	}{
		{
			name: "valid create website dto",
			dto: dto.CreateWebsiteDto{
				Name:      "My Website",
				Content:   []dto.Content{{Type: "text", Value: "Hello"}},
				Redactors: []string{"user123"},
			},
			valid: true,
		},
		{
			name: "name too short",
			dto: dto.CreateWebsiteDto{
				Name:      "AB",
				Content:   []dto.Content{{Type: "text", Value: "Hello"}},
				Redactors: []string{"user123"},
			},
			valid: false,
		},
		{
			name: "empty redactors",
			dto: dto.CreateWebsiteDto{
				Name:      "My Website",
				Content:   []dto.Content{{Type: "text", Value: "Hello"}},
				Redactors: []string{},
			},
			valid: false,
		},
		{
			name: "empty content array passes required check (note: may want min=1)",
			dto: dto.CreateWebsiteDto{
				Name:      "My Website",
				Content:   []dto.Content{},
				Redactors: []string{"user123"},
			},
			valid: true, // Note: "required" on slice only checks non-nil, not non-empty
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			err := validate.Struct(tt.dto)

			if tt.valid {
				assert.NoError(t, err)
			} else {
				assert.Error(t, err)
				assert.IsType(t, validator.ValidationErrors{}, err)
			}
		})
	}
}
