package main

import (
	"log"

	"github.com/Algalyq/Go_project"
	"github.com/Algalyq/Go_project/pkg/handler"
)

func main() {
	handler := new(handler.Handler)

	srv := new(goproject.Server)
	if err := srv.Run("8080", handler.InitRoutes()); err != nil{
		log.Fatalf(err.Error())
	}

}
