package service

import ("github.com/Algalyq/Go_project/pkg/repository"
		"github.com/Algalyq/Go_project")

type Authorization interface {
	CreateUser(user goproject.User) (int, error)
	GenerateToken(username, password string) (string, error)
}

type Service struct {
	Authorization
}

func NewService(repos *repository.Repository) *Service {
    return &Service{
		Authorization: newAuthService(repos.Authorization),
	}  
}