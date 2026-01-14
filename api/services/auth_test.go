package authService

import (
	"api/models"
	"os"
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func setupEnv(t *testing.T, secret string, expireSeconds string) func() {
	os.Setenv("JWT_SECRET", secret)
	os.Setenv("JWT_EXPIRE_TIME_IN_SECONDS", expireSeconds)

	return func() {
		os.Unsetenv("JWT_SECRET")
		os.Unsetenv("JWT_EXPIRE_TIME_IN_SECONDS")
	}
}

func TestGenerateJWT_Success(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "3600")
	defer cleanup()

	user := models.User{
		ID:   "user123",
		Role: "Administrator",
	}

	tokenString, err := GenerateJWT(user)

	require.NoError(t, err)
	assert.NotEmpty(t, tokenString)

	// Parse the token to verify claims
	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte("test-secret-key"), nil
	})

	require.NoError(t, err)
	assert.True(t, token.Valid)

	claims, ok := token.Claims.(jwt.MapClaims)
	require.True(t, ok)

	assert.Equal(t, "user123", claims["user_id"])
	assert.Equal(t, "Administrator", claims["role"])
	assert.NotNil(t, claims["exp"])
	assert.NotNil(t, claims["iat"])
}

func TestGenerateJWT_TokenExpiration(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "60")
	defer cleanup()

	user := models.User{
		ID:   "user456",
		Role: "Editor",
	}

	tokenString, err := GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte("test-secret-key"), nil
	})
	require.NoError(t, err)

	claims := token.Claims.(jwt.MapClaims)

	exp := int64(claims["exp"].(float64))
	iat := int64(claims["iat"].(float64))

	// Expiration should be approximately 60 seconds from issue time
	diff := exp - iat
	assert.Equal(t, int64(60), diff)
}

func TestGenerateJWT_InvalidExpireTime(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "not-a-number")
	defer cleanup()

	user := models.User{
		ID:   "user789",
		Role: "User",
	}

	tokenString, err := GenerateJWT(user)

	assert.Error(t, err)
	assert.Empty(t, tokenString)
}

func TestGenerateJWT_EmptyExpireTime(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "")
	defer cleanup()

	user := models.User{
		ID:   "user789",
		Role: "User",
	}

	tokenString, err := GenerateJWT(user)

	assert.Error(t, err)
	assert.Empty(t, tokenString)
}

func TestGenerateJWT_UsesHS256Algorithm(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "3600")
	defer cleanup()

	user := models.User{
		ID:   "user123",
		Role: "Admin",
	}

	tokenString, err := GenerateJWT(user)
	require.NoError(t, err)

	token, err := jwt.Parse(tokenString, func(tok *jwt.Token) (interface{}, error) {
		// Verify signing method
		assert.Equal(t, jwt.SigningMethodHS256, tok.Method)
		return []byte("test-secret-key"), nil
	})

	require.NoError(t, err)
	assert.True(t, token.Valid)
}

func TestGenerateJWT_DifferentUsers(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "3600")
	defer cleanup()

	tests := []struct {
		name string
		user models.User
	}{
		{
			name: "admin user",
			user: models.User{ID: "admin1", Role: "Administrator"},
		},
		{
			name: "editor user",
			user: models.User{ID: "editor1", Role: "Editor"},
		},
		{
			name: "user with special chars in ID",
			user: models.User{ID: "user-with-special_chars.123", Role: "User"},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tokenString, err := GenerateJWT(tt.user)
			require.NoError(t, err)

			token, _ := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
				return []byte("test-secret-key"), nil
			})

			claims := token.Claims.(jwt.MapClaims)
			assert.Equal(t, tt.user.ID, claims["user_id"])
			assert.Equal(t, tt.user.Role, claims["role"])
		})
	}
}

func TestGenerateJWT_TokenIssuedAtIsRecent(t *testing.T) {
	cleanup := setupEnv(t, "test-secret-key", "3600")
	defer cleanup()

	beforeGeneration := time.Now().Unix()

	user := models.User{ID: "user1", Role: "User"}
	tokenString, err := GenerateJWT(user)
	require.NoError(t, err)

	afterGeneration := time.Now().Unix()

	token, _ := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		return []byte("test-secret-key"), nil
	})

	claims := token.Claims.(jwt.MapClaims)
	iat := int64(claims["iat"].(float64))

	assert.GreaterOrEqual(t, iat, beforeGeneration)
	assert.LessOrEqual(t, iat, afterGeneration)
}
