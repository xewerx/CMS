package authService

import (
	"api/models"

	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(user models.User) (string, error) {
	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	jwtExpiresIn, err := strconv.Atoi(os.Getenv("JWT_EXPIRE_TIME_IN_SECONDS"))
	if err != nil {
		return "", err
	}

	claims := jwt.MapClaims{
		"user_id": user.ID,
		"role":    user.Role,
		"exp":     time.Now().Add(time.Duration(jwtExpiresIn) * time.Second).Unix(),
		"iat":     time.Now().Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(jwtSecret)
}
