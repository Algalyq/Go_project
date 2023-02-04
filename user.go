package goproject

type User struct {
	Id int `json:"-" db:"id"`
	Fullname     string `json:"fullname" binding:"required"`
	Password string `json:"password" binding:"required"` 
	Email string `json:"email" binding:"required"` 
	Confirmpassword string `json:"confirmPassword" binding:required"`
}