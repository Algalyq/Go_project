from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import FieldDoesNotExist
from django.core.validators import RegexValidator

phone_regex = RegexValidator( regex   =r'^\+?1?\d{9,14}$', message ="Phone number must be entered in the format: '+999999999'. Up to 14 digits allowed.")
  
card_regex = RegexValidator( regex   =r'^\?1?\d{9,12}$', message ="Card number must be entered in the format: '**** **** **** ****'. Up to 12 digits allowed.")
  
class CustomUser(AbstractUser):
    phone  = models.CharField(validators=[phone_regex], max_length=17, unique=True,null=True)
    CardNo = models.CharField(max_length=12,validators=[card_regex],null=True)



class Category(models.Model):
    CategoryName = models.CharField(max_length=128)

class Products(models.Model):
    sellerID = models.ForeignKey('CustomUser', on_delete=models.CASCADE,null=True)
    categoryID = models.ForeignKey('Category', on_delete=models.CASCADE,null=True)
    producttitle = models.CharField(max_length=128)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField(null=True)
    pddesc = models.TextField()

    def __str__(self):
        return self.producttitle
    

class ProductImages(models.Model):
    product = models.ForeignKey(Products, on_delete=models.CASCADE,related_name="images")
    image = models.FileField(upload_to='img',null=True,blank=True)     
   


STARS_CHOICES = [
    (0, '0'),
    (1, '1'),
    (2, '2'),
    (3, '3'),
    (4, '4'),
    (5, '5')
]

class Comments(models.Model):
    ip= models.CharField("IP address", max_length=15)
    ProductID=models.ForeignKey('Products',on_delete=models.CASCADE, related_name='review')
    UserID = models.ForeignKey('CustomUser',on_delete=models.CASCADE)
    BodyComment = models.TextField()
    star = models.PositiveIntegerField(choices=STARS_CHOICES,default=0)
  



    