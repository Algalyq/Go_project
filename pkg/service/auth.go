package service

import (
	"crypto/sha1"
	"fmt"
	"github.com/Algalyq/Go_project"
	"github.com/Algalyq/Go_project/pkg/repository"
	"github.com/dgrijalva/jwt-go"
	"time"
)

const (salt = "s45ew4fd5f1verv5erg"
	   tokenTTL = time.Hour * 12
	   signingKey = "s45ew4fd5f1verv5erg"
	)


type tokenClaims struct {
	jwt.StandardClaims
	UserId int `json:"user_id"`
}

type AuthService struct {
	repo repository.Authorization
}

func newAuthService(repo repository.Authorization) *AuthService {
	return &AuthService{repo:repo}
}

func (a *AuthService) CreateUser(user goproject.User) (int, error) {
	user.Password = generatePasswordHash(user.Password)	 
    return a.repo.CreateUser(user)
}

func (a *AuthService) GenerateToken(username,password string) (string, error) {
	user, err := a.repo.GetUser(username,generatePasswordHash(password))
	if err!= nil {
        return "", err
    }
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, &tokenClaims{
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(tokenTTL).Unix(),
			IssuedAt: time.Now().Unix(),
		},
		user.Id,		
	})
	return token.SignedString([]byte(signingKey))
}


func generatePasswordHash(password string) string {
	hash := sha1.New()
	hash.Write([]byte(password))
	return fmt.Sprintf("%x",hash.Sum([]byte(salt)))
}