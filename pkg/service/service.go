package service

import (
	"github.com/Algalyq/Go_project"
	"github.com/Algalyq/Go_project/pkg/repository"
	"github.com/gin-gonic/gin"
)

type Authorization interface {
	CreateUser(user goproject.User) (int, error)
	GenerateToken(username, password string) (string, error)
	ParseToken(token string) (int, error)
	RefreshToken(username,password string) (string,error)
}

type Searhing interface {
	GetSearchingProduct(c *gin.Context) ([]goproject.Products,error)
}

type Service struct {
	Authorization
	Searhing
}

func NewService(repos *repository.Repository) *Service {
    return &Service{
		Authorization: newAuthService(repos.Authorization),
		Searhing: newSearchService(repos.Searching),
	}  
}