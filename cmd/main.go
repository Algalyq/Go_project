package main

import (
	"log"

	"github.com/spf13/viper"
	"github.com/Algalyq/Go_project"
	"github.com/Algalyq/Go_project/pkg/handler"
	"github.com/Algalyq/Go_project/pkg/repository"
	"github.com/Algalyq/Go_project/pkg/service"
)

func main() {
	if err := initConfig(); err != nil {
		log.Fatal(err.Error())
    }
	repo := repository.NewRepository()
	services := service.NewService(repo)
	handler := handler.NewHandler(services)

	srv := new(goproject.Server)
	if err := srv.Run(viper.GetString("8080"), handler.InitRoutes()); err != nil{
		log.Fatalf(err.Error())
	}

}

func initConfig()  error {
	viper.AddConfigPath("../configs")
	viper.SetConfigName("config")
	return viper.ReadInConfig()
}