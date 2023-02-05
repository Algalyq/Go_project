from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

from django.core.validators import RegexValidator

phone_regex = RegexValidator( regex   =r'^\+?1?\d{9,14}$', message ="Phone number must be entered in the format: '+999999999'. Up to 14 digits allowed.")
  
class CustomUser(AbstractUser):
    phone       = models.CharField(validators=[phone_regex], max_length=17, unique=True,null=True)


class Seller(models.Model):
    Fullname = models.CharField(max_length=255)
    Password = models.CharField(max_length=128)
    MobileNumber       = models.CharField(validators=[phone_regex], max_length=17, unique=True,null=True)
    Email = models.CharField(max_length=128)
    CardNo = models.CharField(max_length=12)


class Category(models.Model):
    CategoryName = models.CharField(max_length=128)

class Products(models.Model):
    sellerID = models.ForeignKey('Seller', on_delete=models.CASCADE)
    categoryID = models.ForeignKey('Category', on_delete=models.CASCADE)
    producttitle = models.CharField(max_length=128)
    price = models.PositiveIntegerField()
    quantity = models.PositiveIntegerField()
    pddesc = models.TextField()
    imageNo1 = models.FileField(upload_to='uploads/',blank=True,null=False)
    imageNo2 = models.FileField(upload_to='uploads/',blank=True,null=False)
    imageNo3 = models.FileField(upload_to='uploads/',blank=True,null=False)
    imageNo4 = models.FileField(upload_to='uploads/',blank=True,null=False)
    imageNo5 = models.FileField(upload_to='uploads/',blank=True,null=False)

class Comments(models.Model):
    ProductID = models.ForeignKey('Products',on_delete=models.CASCADE)
    UserID = models.ForeignKey('CustomUser',on_delete=models.CASCADE)
    BodyComment = models.TextField()
