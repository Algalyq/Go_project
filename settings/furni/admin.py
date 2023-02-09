
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *

fields = list(UserAdmin.fieldsets)
fields[1] = ('Personal Info', {'fields':('first_name', 'last_name','email','phone')})
UserAdmin.fieldsets = tuple(fields)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id','CategoryName')
   


@admin.register(Seller)
class Seller(admin.ModelAdmin):
    list_display = ('id','Fullname','Email','CardNo')


@admin.register(Products)
class Products(admin.ModelAdmin):
    list_display = ('id','sellerID','categoryID','producttitle','price','quantity')

@admin.register(Comments)
class Comments(admin.ModelAdmin):
    list_display = ('ProductID','UserID','BodyComment')

@admin.register(Rating)
class Rating(admin.ModelAdmin):
    list_display = ('ip','star','ProductID')

@admin.register(RatingStar)
class RatingStar(admin.ModelAdmin):
    list_display = ('value',)
    

admin.site.register(CustomUser, UserAdmin)