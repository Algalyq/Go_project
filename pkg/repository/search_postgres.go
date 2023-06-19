package repository

import (
	"fmt"

	"github.com/Algalyq/Go_project/data"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"gorm.io/gorm"
	"gorm.io/driver/postgres"
)


type SearchPostgres struct {
	dba *sqlx.DB
}


func NewSearchPostgres(dba *sqlx.DB) *SearchPostgres {
	return &SearchPostgres{dba:dba}
}


func (a *SearchPostgres) GetSearchingProduct(c *gin.Context) ([]data.Products, error) {

	dsn := "host=postgres-db user=docker password=docker dbname=test_db port=5432 sslmode=disable"
	
	db,err := gorm.Open(postgres.Open(dsn),&gorm.Config{})
	var products []data.Products
		
	if err != nil {
		panic("Could not connect to the database")
	}
	sql := "SELECT fp.id,fp.producttitle,fp.price,fp.quantity,fp.pddesc, pr.image FROM furni_products AS fp join furni_productimages AS pr on fp.id = pr.product_id"
	
		
		if s := c.Query("t"); s != "" {
			sql = fmt.Sprintf("%s WHERE fp.producttitle LIKE '%%%s%%'", sql, s)
		}
		db.Raw(sql).Scan(&products)

		return products,nil
	
	// var products []data.Products
		
	// sql := fmt.Sprintf("SELECT fp.id,fp.producttitle,fp.price,fp.quantity,fp.pddesc, pr.image FROM furni_products AS fp join furni_productimages AS pr on fp.id = pr.product_id WHERE fp.producttitle LIKE '%%$1%%' LIMIT 1")
	
	// s := c.Query("s")
	// fmt.Sprint(s)
	// row := a.dba.QueryRow(sql,s)

	// row.Scan(&products)
	
	// return products,nil
}


