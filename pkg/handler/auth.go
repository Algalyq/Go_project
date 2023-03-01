package handler

import (
	"bytes"
	"encoding/json"
	// "fmt"

	"io/ioutil"
	"log"
	"net/http"

	"github.com/Algalyq/Go_project"
	"github.com/gin-gonic/gin"
)

func (h *Handler) signup(c *gin.Context){
	var input goproject.User

	if err := c.BindJSON(&input); err!= nil {
			newErrorResponse(c,http.StatusBadRequest, err.Error())
			return
	}
	
	if err := h.validate(c,input); err == 1{
	msg, err := h.services.Authorization.CreateUser(input)
	if err!= nil {
		newErrorResponse(c,http.StatusBadRequest, err.Error())
		return 
	}
	c.JSON(http.StatusOK,map[string]interface{}{
		"msg":msg,
		"status":http.StatusOK,
	})
}
	
}

type signInInput struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"` 
}



func (h *Handler) signin(c *gin.Context){
	var input signInInput

	if err := c.BindJSON(&input); err!= nil {
			newErrorResponse(c,http.StatusBadRequest, err.Error())
			return
	}
	// token, err := h.services.Authorization.GenerateToken(input.Username,input.Password)
	// if err!= nil {
	// 	newErrorResponse(c,http.StatusBadRequest, err.Error())
	// 	return
	// }
	postBody, _ := json.Marshal(map[string]string{
		"username": input.Username,
		"password":input.Password,
	 })

	 type tokens struct {
		Refresh string 	`json:refresh`
		Access string `json:access`
	}
	responseBody := bytes.NewBuffer(postBody)
	resp, err := http.Post("http://localhost:8000/products/seller/login","application/json", responseBody)
	if err != nil {
		log.Fatalf("An Error Occured %v", err)
	 }
	 defer resp.Body.Close()
	 body, err := ioutil.ReadAll(resp.Body)

	 if err != nil {
		log.Fatalln(err)
	 }
	 bytes := []byte(string(body))
	var token tokens
	jsonERr := json.Unmarshal(bytes,&token)
	if jsonERr != nil{
	   panic(jsonERr)
	}

	c.JSON(http.StatusOK,map[string]interface{}{
		"token":token.Access,
	})
}