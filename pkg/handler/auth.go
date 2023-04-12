package handler

import (
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
		token, err := h.services.Authorization.GenerateToken(input.Username,input.Password)
		refresh,err := h.services.Authorization.RefreshToken(input.Username,input.Password)
		if err!= nil {
			newErrorResponse(c,http.StatusBadRequest, err.Error())
			return
		}
		c.JSON(http.StatusOK,map[string]interface{}{
			"access_token":token,
			"refresh_token":refresh,
		})
	}
 




	