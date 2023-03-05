from rest_framework import serializers
from furni.models import *
from furni.service import get_client_ip
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.db.models import Avg,F,Sum,Count
import math

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=CustomUser.objects.all())]
            )

    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name','password', 'password2')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = CustomUser.objects.create(
            username=validated_data['email'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_superuser=True,
        )
        user.set_password(validated_data['password'])
        user.save()

        return user

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ["id","product","image"]

        
class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields = ['ProductID','BodyComment','star']

    def create(self,validated_data):
        validated_data['ip'] = get_client_ip(self.context['request'])
        validated_data['UserID'] = self.context['request'].user
        comment = Comments.objects.create(**validated_data)

        return comment

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields = ['ProductID','UserID','BodyComment','star']

class ProductsSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)


    class Meta:
        model = Products
        fields = ["producttitle","price","sellerID","quantity","pddesc","categoryID","images","uploaded_images"]
        extra_kwargs = {"user":{"read_only":True}}
        
    def create(self,validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        validated_data['sellerID'] = self.context['request'].user
        product = Products.objects.create(**validated_data)
        for image in uploaded_images:
            newproduct_image = ProductImages.objects.create(product=product, image=image)
        return product


class ProductsDetailSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    review = ReviewSerializer(many=True)
    average_rating= serializers.SerializerMethodField()
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)


    class Meta:
        model = Products
        fields = ["producttitle","price","sellerID","quantity","pddesc","categoryID","review","average_rating", "images","uploaded_images"]
        extra_kwargs = {"user":{"read_only":True}}
        
    def create(self,validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        validated_data['sellerID'] = self.context['request'].user
        product = Products.objects.create(**validated_data)
        for image in uploaded_images:
            newproduct_image = ProductImages.objects.create(product=product, image=image)
        return product
    
    def get_average_rating(self,obj):
        av = Comments.objects.filter(ProductID=obj.id).aggregate(Avg('star',output_field=models.IntegerField()))
        if av == None:
            return -1 
        return av

    


