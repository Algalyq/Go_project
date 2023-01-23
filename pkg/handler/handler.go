package handler

import ("github.com/gin-gonic/gin"
		)

type Handler struct {}


func (h *Handler) InitRoutes() *gin.Engine {
	//  gin.SetMode(gin.ReleaseMode)
	 router := gin.New()

	 auth := router.Group("/auth", h.signup)
	 {
		auth.GET("/signup")
	 }

	 return router
}