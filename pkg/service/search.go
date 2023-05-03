package service

import (
	"github.com/Algalyq/Go_project/data"
	"github.com/Algalyq/Go_project/pkg/repository"
	"github.com/gin-gonic/gin"
)

type SearchService struct {
	repo repository.Searching
}

func newSearchService(repo repository.Searching) *SearchService{
	return &SearchService{repo:repo}
}

func (a *SearchService) GetSearchingProduct(c *gin.Context) ([]data.Products,error) {
	return a.repo.GetSearchingProduct(c)
	
}
