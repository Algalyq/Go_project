package repository

import (
	"fmt"
	"github.com/Algalyq/Go_project/data"
	"github.com/jmoiron/sqlx"
	"github.com/gin-gonic/gin"
)


type SearchPostgres struct {
	dba *sqlx.DB
}


func NewSearchPostgres(dba *sqlx.DB) *SearchPostgres {
	return &SearchPostgres{dba:dba}
}


func (a *SearchPostgres) GetSearchingProduct(c *gin.Context) ([]data.Products, error) {

	var products []data.Products
		
	sql := fmt.Sprintf("SELECT fp.id,fp.producttitle,fp.price,fp.quantity,fp.pddesc, pr.image FROM furni_products AS fp join furni_productimages AS pr on fp.id = pr.product_id WHERE fp.producttitle LIKE '%%$1%%' LIMIT 1")
	
	s := c.Query("s")

	row := a.dba.QueryRow(sql,s)

	row.Scan(&products)
	
	return products,nil
}


