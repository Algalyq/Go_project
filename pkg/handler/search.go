package handler

import (
	// "bytes"
	// "encoding/json"
	// "io/ioutil"
	// "log"
	"net/http"

	"github.com/gin-gonic/gin"
)


func (h *Handler) Search(c *gin.Context){
	s, err := h.services.Searhing.GetSearchingProduct(c)

	// reqBody, errreq := json.Marshal(map[string]string{
	// 	"username":"admin",
	// 	"password":"123",
	// })
	// if errreq != nil{
	// 	log.Fatalln(errreq)
	// }


	// resp, err2 := http.Post("http://localhost:8000/products/seller/login","application/json",bytes.NewBuffer(reqBody))
	// if err2 != nil{
	// 	log.Fatal(err2)
	// }

	// defer resp.Body.Close()
	// body, err3 :=ioutil.ReadAll(resp.Body)
	// if err3 != nil{
	// 	log.Fatalln(err3)
	// }

	if err!= nil {
		newErrorResponse(c,http.StatusBadRequest, err.Error())
		return
	}
	c.JSON(http.StatusOK,map[string]interface{}{
		"data":s,
		// "res":body,
	})
}
