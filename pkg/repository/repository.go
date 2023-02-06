package repository

import (
	"github.com/Algalyq/Go_project"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)


type Authorization interface {
	CreateUser(user goproject.User) (int, error)
	GetUser(username,password string) (goproject.User, error)
}

type Searching interface {
	GetSearchingProduct(c *gin.Context) ([]goproject.Products, error)
}

type Repository struct {
	Authorization
	Searching
}

func NewRepository(db *sqlx.DB) *Repository {
    return &Repository{
		Authorization: NewAuthPostgres(db),
		Searching: NewSearchPostgres(db),
	}
}