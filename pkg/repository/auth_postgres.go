package repository

import (
	"fmt"

	"github.com/Algalyq/Go_project"
	"github.com/jmoiron/sqlx"
)


type AuthPostgres struct {
	db *sqlx.DB
}


func NewAuthPostgres(db *sqlx.DB) *AuthPostgres {
	return &AuthPostgres{db:db}
}

func (a *AuthPostgres) CreateUser(user goproject.User) (int, error) {
	var id int
	query := fmt.Sprintf("INSERT INTO %s (name,username,password_hash) VALUES ($1,$2,$3) RETURNING id", usertable)
	row := a.db.QueryRow(query,user.Name,user.Username,user.Password)
	if err:= row.Scan(&id); err!= nil {
		return 0,err
	}
	return id,nil
}

func (a *AuthPostgres) GetUser(username,password string) (goproject.User, error) {
	var user goproject.User
	query := fmt.Sprintf("SELECT id FROM %s WHERE username=$1 AND password_hash=$2", usertable)
	err := a.db.Get(&user,query,username,password)
	
	return user,err 
}