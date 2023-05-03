package handler

import (
	"net/http"
	"github.com/gin-gonic/gin"
)


func (h *Handler) Search(c *gin.Context){
	s, err := h.services.Searhing.GetSearchingProduct(c)

	if err!= nil {
		newErrorResponse(c,http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK,map[string]interface{}{
		"data":s,
	})
}
