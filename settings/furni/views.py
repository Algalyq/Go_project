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
from .filters import *
from rest_framework.parsers import MultiPartParser, FormParser

from rest_framework.decorators import action
from rest_framework import viewsets

from rest_framework.filters import OrderingFilter   
from rest_framework import generics

# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()

    # permission_classes = [IsAuthenticated]
    serializer_class = ProductsUploadSerializer
    
    parser_classes = (MultiPartParser, FormParser)



    



class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer


    

# class ProductFilter(generics.ListAPIView):
#     queryset = Products.objects.all()
#     serializer_class = ProductsSerializer
#     filter_backends = [DjangoFilterBackend]
#     filterset_class = ProductFilters

# class ProductsListView(APIView):
    
#     def get(self,request):
        # productslist = Products.objects.all().annotate(
        #     rating_user=models.Count("ratings", filter=models.Q(ratings__ip=get_client_ip(request)))
        #      ).annotate(
        #     middle_star=models.Sum(models.F('ratings__star')) / models.Count(models.F('ratings'))
        # )
#         serializer = ProductsSerializer(productslist,many=True)
#         return Response(serializer.data)



class CommentView(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = ReviewCreateSerializer


# class RatingView(viewsets.ModelViewSet):
#     queryset = Rating.objects.all()
#     serializer_class = RatingSerializer


class AddStarRatingView(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = CreateRatingSerializer


# class AddStarRatingView(APIView):
#     def post(self,request):
#         serializer = CreateRatingSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(ip=get_client_ip(request))
#             return Response(status=201)
#         else:
#             return Response(status=400)


    



   
   
