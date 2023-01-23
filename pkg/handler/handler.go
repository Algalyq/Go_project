package handler

import (
	"github.com/Algalyq/Go_project/pkg/service"
	"github.com/gin-gonic/gin"
)

type Handler struct {
	services *service.Service
}

func NewHandler(services *service.Service) *Handler {
    return &Handler{services: services}
}

func (h *Handler) InitRoutes() *gin.Engine {
	//  gin.SetMode(gin.ReleaseMode)
	 router := gin.New()

	 auth := router.Group("/auth", h.signup)
	 {
		auth.GET("/signup")
	 }

	 return router
}