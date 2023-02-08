from django.shortcuts import render
from furni.models import Products
from furni.serializers import ProductsSerializer, ProductsDetailSerializer, ReviewCreateSerializer, CreateRatingSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.response import Response
from rest_framework.views import APIView
from furni.service import get_client_ip
from django.db import models



# Create your views here.

class ProductsListView(APIView):
    
    def get(self,request):
        productslist = Products.objects.all().annotate(
            rating_user=models.Count("ratings", filter=models.Q(ratings__ip=get_client_ip(request)))
             ).annotate(
            middle_star=models.Sum(models.F('ratings__star')) / models.Count(models.F('ratings'))
        )
        serializer = ProductsSerializer(productslist,many=True)
        return Response(serializer.data)

class ProductsDetailView(APIView):

    def get(self,request,pk):
            productslist = Products.objects.get(id=pk)
            serializer = ProductsDetailSerializer(productslist)
            return Response(serializer.data)
 
class ReviewCreateView(APIView):
    def post(self,request):
        review = ReviewCreateSerializer(data=request.data)
        if review.is_valid():
            review.save()
        return Response(status=201)

class AddStarRatingView(APIView):
         
    def post(self,request):
        serializer = CreateRatingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(ip=get_client_ip(request))
            return Response(status=201)
        else:
            return Response(status=400)


    



   
   
