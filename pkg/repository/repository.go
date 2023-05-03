package repository

import (
	"github.com/Algalyq/Go_project/data"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
)


type Authorization interface {
	CreateUser(user data.User) (int, error)
	GetUser(username,password string) (data.User, error)
}

type Searching interface {
	GetSearchingProduct(c *gin.Context) ([]data.Products, error)
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