
from django.contrib import admin
from django.urls import path,include
from .views import *  
from rest_framework import routers
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('rating/',ProductViewSet,basename="ratings")

publishing_product_list = ProductViewSet.as_view({'get':'list','post':'create'})
publishing_product_dt = ProductViewSet.as_view({'delete':'destroy'})

comment_list = CommentView.as_view({'get':'list','post':'create'})
comment_detail = CommentView.as_view({'delete':'destroy'})

star = AddStarRatingView.as_view({'get':'list','post':'create'})
urlpatterns = [
    path('',publishing_product_list,name="all_products"),
    path('<int:pk>',publishing_product_dt,name="productsdetail"),
    path('comments/',comment_list,name="commentlist"),
    path('comments_dt/<int:pk>',comment_detail,name="commentdetail"),
    path('',include(router.urls), name='rating_star'),
    # # path('prfil/',ProductFilter.as_view()),
    # path('seller/registration', RegisterView.as_view(), name='auth_register'),
    path('seller/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

