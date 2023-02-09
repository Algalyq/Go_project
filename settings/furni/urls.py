
from django.contrib import admin
from django.urls import path,include
from .views import *  

urlpatterns = [
    path('products/', ProductsListView.as_view()),
    path('products/<int:pk>/', ProductsDetailView.as_view()),
    path('review/',ReviewCreateView.as_view()),
    path('rating/',AddStarRatingView.as_view()),

]

