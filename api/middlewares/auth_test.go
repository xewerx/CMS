package middleware

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const testSecret = "test-jwt-secret-key"

func setupAuthEnv(t *testing.T) func() {
	os.Setenv("JWT_SECRET", testSecret)
	return func() {
		os.Unsetenv("JWT_SECRET")
	}
}

func createTestToken(userId string, role string, expiration time.Time) string {
	claims := jwt.MapClaims{
		"user_id": userId,
		"role":    role,
		"exp":     expiration.Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte(testSecret))
	return tokenString
}

func createTokenWithWrongSecret(userId string, role string) string {
	claims := jwt.MapClaims{
		"user_id": userId,
		"role":    role,
		"exp":     time.Now().Add(time.Hour).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, _ := token.SignedString([]byte("wrong-secret"))
	return tokenString
}

func TestAuthMiddleware_MissingAuthorizationHeader(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
	assert.Contains(t, rec.Body.String(), "missing token")
}

func TestAuthMiddleware_EmptyAuthorizationHeader(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "")
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
}

func TestAuthMiddleware_InvalidTokenFormat(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer invalid-token-format")
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
}

func TestAuthMiddleware_ExpiredToken(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	// Create a token that expired 1 hour ago
	expiredToken := createTestToken("user123", "Admin", time.Now().Add(-time.Hour))

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+expiredToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
	assert.Contains(t, rec.Body.String(), "token expired")
}

func TestAuthMiddleware_WrongSignature(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	// Create token with wrong secret
	wrongToken := createTokenWithWrongSecret("user123", "Admin")

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+wrongToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
	assert.Contains(t, rec.Body.String(), "invalid token")
}

func TestAuthMiddleware_ValidToken_PassesThrough(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	var capturedUserId, capturedRole interface{}

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		capturedUserId = r.Context().Value(UserIdContextKey)
		capturedRole = r.Context().Value(UserRoleContextKey)
		w.WriteHeader(http.StatusOK)
	})

	middleware := AuthMiddleware(nextHandler)

	validToken := createTestToken("user456", "Editor", time.Now().Add(time.Hour))

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+validToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, "user456", capturedUserId)
	assert.Equal(t, "Editor", capturedRole)
}

func TestAuthMiddleware_ContextKeys(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	tests := []struct {
		name     string
		userId   string
		role     string
	}{
		{"admin user", "admin-001", "Administrator"},
		{"editor user", "editor-002", "Editor"},
		{"basic user", "user-003", "User"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			var capturedUserId, capturedRole interface{}

			nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
				capturedUserId = r.Context().Value(UserIdContextKey)
				capturedRole = r.Context().Value(UserRoleContextKey)
				w.WriteHeader(http.StatusOK)
			})

			middleware := AuthMiddleware(nextHandler)
			validToken := createTestToken(tt.userId, tt.role, time.Now().Add(time.Hour))

			req := httptest.NewRequest(http.MethodGet, "/protected", nil)
			req.Header.Set("Authorization", "Bearer "+validToken)
			rec := httptest.NewRecorder()

			middleware.ServeHTTP(rec, req)

			assert.Equal(t, http.StatusOK, rec.Code)
			assert.Equal(t, tt.userId, capturedUserId)
			assert.Equal(t, tt.role, capturedRole)
		})
	}
}

func TestAuthMiddleware_BearerPrefixStripping(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
	})

	middleware := AuthMiddleware(nextHandler)
	validToken := createTestToken("user123", "Admin", time.Now().Add(time.Hour))

	// Test with "Bearer " prefix (correct format)
	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+validToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestAuthMiddleware_TokenJustExpired(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t.Error("Next handler should not be called")
	})

	middleware := AuthMiddleware(nextHandler)

	// Create a token that expired 1 second ago
	expiredToken := createTestToken("user123", "Admin", time.Now().Add(-time.Second))

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+expiredToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusUnauthorized, rec.Code)
}

func TestAuthMiddleware_TokenExpiresInFuture(t *testing.T) {
	cleanup := setupAuthEnv(t)
	defer cleanup()

	handlerCalled := false
	nextHandler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		handlerCalled = true
		w.WriteHeader(http.StatusOK)
	})

	middleware := AuthMiddleware(nextHandler)

	// Token expires in 1 hour
	validToken := createTestToken("user123", "Admin", time.Now().Add(time.Hour))

	req := httptest.NewRequest(http.MethodGet, "/protected", nil)
	req.Header.Set("Authorization", "Bearer "+validToken)
	rec := httptest.NewRecorder()

	middleware.ServeHTTP(rec, req)

	require.True(t, handlerCalled, "Next handler should be called for valid token")
	assert.Equal(t, http.StatusOK, rec.Code)
}

func TestContextKeyType(t *testing.T) {
	// Verify context keys are of correct type
	assert.IsType(t, contextKey(""), UserIdContextKey)
	assert.IsType(t, contextKey(""), UserRoleContextKey)

	// Verify context key values
	assert.Equal(t, contextKey("user_id"), UserIdContextKey)
	assert.Equal(t, contextKey("role"), UserRoleContextKey)
}
