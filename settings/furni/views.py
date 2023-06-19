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
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework.permissions import AllowAny
from .filters import *
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework import generics


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    parser_classes = (MultiPartParser, FormParser)
    # permission_classes = [IsAuthenticated]
    serializer_class = ProductsSerializer

class ProductDetailViewSet(viewsets.ModelViewSet):
    queryset = Products.objects.all()
    parser_classes = (MultiPartParser, FormParser,JSONParser)
    # permission_classes = [IsAuthenticated]
    serializer_class = ProductsDetailSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    
class ProductFilter(generics.ListAPIView):
    queryset = Products.objects.all()
    serializer_class = ProductsDetailSerializer
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_class = ProductFilters



class CommentView(viewsets.ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = ReviewCreateSerializer


class CommentDetailView(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    queryset = Comments.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(ProductID=self.kwargs.get('pk'))
    

class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)