package middleware

import (
	"context"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type contextKey string

const (
	UserIdContextKey   contextKey = "user_id"
	UserRoleContextKey contextKey = "role"
)

func AuthMiddleware(next http.Handler) http.Handler {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		auth := r.Header.Get("Authorization")
		if auth == "" {
			http.Error(w, "missing token", http.StatusUnauthorized)
			return
		}

		tokenStr := strings.TrimPrefix(auth, "Bearer ")

		token, err := jwt.Parse(tokenStr, func(t *jwt.Token) (interface{}, error) {
			return jwtSecret, nil
		})

		exp, ok := token.Claims.(jwt.MapClaims)["exp"].(float64)
		if !ok {
			http.Error(w, "invalid token exp", http.StatusUnauthorized)
			return
		}

		if time.Now().Unix() > int64(exp) {
			http.Error(w, "token expired", http.StatusUnauthorized)
			return
		}

		if err != nil || !token.Valid {
			http.Error(w, "invalid token", http.StatusUnauthorized)
			return
		}

		tokenClaims := token.Claims.(jwt.MapClaims)
		ctx := context.WithValue(r.Context(), UserIdContextKey, tokenClaims["user_id"])
		ctx = context.WithValue(ctx, UserRoleContextKey, tokenClaims["role"])

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
