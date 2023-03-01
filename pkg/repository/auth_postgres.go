package repository

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"log"

	"fmt"
	"net/http"
	// "time"

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
	// params := url.Values{}
	// params.Add("Username",user.First_name)
	// params.Add("First_name",user.First_name)
	// params.Add("Last_name",user.Last_name)
	// params.Add("Email",user.Email)
	// params.Add("Password",user.Password)
	postBody, _ := json.Marshal(map[string]string{
		"email": user.Email,
		"first_name":user.First_name,
		"last_name":user.Last_name,
		"password":user.Password,
		"password2":user.Password,
	 })
	responseBody := bytes.NewBuffer(postBody)
	resp, err := http.Post("http://localhost:8000/products/seller/registration","application/json", responseBody)
	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	 }
	 defer resp.Body.Close()
  //Read the response body
	 body, err := ioutil.ReadAll(resp.Body)
	 if err != nil {
		log.Fatalln(err)
	 }
	 sb := string(body)
	 log.Printf(sb)
	// query := fmt.Sprintf("INSERT INTO %s (first_name,last_name,username,email,password,is_staff,is_superuser,is_active,date_joined) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id", usertable)
	// row := a.db.QueryRow(query,user.First_name,user.Last_name,user.First_name,user.Email,user.Password,true,false,true,time.Now())
	
	query := fmt.Sprintf("SELECT id FROM %s WHERE username=$1", usertable)
	row := a.db.QueryRow(query,user.Email)
	
	if err:= row.Scan(&id); err!= nil {
		return 0,err
	}

	return id,nil
}


func (a *AuthPostgres) GetUser(username,password string) (goproject.User, error) {
	var user goproject.User
	return user,nil
}