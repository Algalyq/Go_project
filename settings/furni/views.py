from django.shortcuts import render
from furni.models import Products
from furni.serializers import *
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from furni.service import get_client_ip
from rest_framework.permissions import IsAuthenticated
from django.db import models

from rest_framework.permissions import AllowAny
from .filters import *
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.decorators import action
from rest_framework import viewsets

from rest_framework import generics

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()

    # permission_classes = [IsAuthenticated]
    serializer_class = ProductsSerializer
    parser_classes = (MultiPartParser, FormParser)




class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()

    # permission_classes = [IsAuthenticated]
    serializer_class = ProductsDetailSerializer
    parser_classes = (MultiPartParser, FormParser)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer


    

class ProductFilter(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsDetailSerializer
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    # filterset_class = ProductFilters
    filterset_fields = {
       'price': [ 'lte', 'gte']
    } 

    # ordering = ('price')


class CommentView(viewsets.ModelViewSet):

    # permission_classes = [IsAuthenticated]
    queryset = Comments.objects.all()
    serializer_class = ReviewCreateSerializer
