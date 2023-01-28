package repository

import ("github.com/jmoiron/sqlx"
		"github.com/Algalyq/Go_project")


type Authorization interface {
	CreateUser(user goproject.User) (int, error)
	GetUser(username,password string) (goproject.User, error)
}

type Repository struct {
	Authorization
}

func NewRepository(db *sqlx.DB) *Repository {
    return &Repository{
		Authorization: NewAuthPostgres(db),
	}
}