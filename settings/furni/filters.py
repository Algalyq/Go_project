from django_filters.rest_framework import FilterSet 
from rest_framework.filters import OrderingFilter   
from .models import Products

class ProductFilters(FilterSet):
    class Meta:
        model = Products
        fields = {
            # 'producttitle'
            'price': ['gt','lt'],
            # 'ratings': ['exact','rating']
        }