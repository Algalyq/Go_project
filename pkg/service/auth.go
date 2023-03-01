package service

import (
	// "golang.org/x/crypto/bcrypt"
	"github.com/Algalyq/Go_project"
	"github.com/Algalyq/Go_project/pkg/repository"
	"github.com/dgrijalva/jwt-go"
	"time"
	"errors"
)

const (salt = "@l(*i3aqztc#397#p%^8babo$$o1$9ct%^o*4y5d=&6rg58bvb"
	   tokenTTL = time.Hour * 12
	   signingKey = "@l(*i3aqztc#397#p%^8babo$$o1$9ct%^o*4y5d=&6rg58bvb"
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
	return a.repo.CreateUser(user)	
	
	
}

func (a *AuthService) GenerateToken(username,password string) (string, error) {
	user, err := a.repo.GetUser(username,password)
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

func(s*AuthService) ParseToken(accessToken string) (int, error) {
	token,err:= jwt.ParseWithClaims(accessToken,&tokenClaims{}, func(token *jwt.Token) (interface{}, error) {
	  if _, ok := token.Method.(*jwt.SigningMethodHMAC);!ok {	
		return nil, errors.New("invalid signing method")
	}	
	return []byte(signingKey),nil
	})
	if err!= nil {
			return 0, err
		}

		claims,ok :=token.Claims.(*tokenClaims)
		if !ok {
			return 0, errors.New("token claims are not of type ")
        }
		return claims.UserId, nil
		}
	



