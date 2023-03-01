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
	 router := gin.New()
	 auth := router.Group("/auth")
	 {
		auth.POST("/signup/",h.signup)
		auth.POST("/signin/",h.signin)
	 }
	//  api :=router.Group("/api", h.userIdentity)
	//  {
	// 	authList := api.Group("/list")
	// 	{
	// 		authList.POST("/",h.createList)
	// 	}
	//  }
	 search := router.Group("/products")
	 {
		search.GET("/search/",h.Search)
	 }

	
	 return router
}