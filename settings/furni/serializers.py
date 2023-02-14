from rest_framework import serializers
from furni.models import *
from furni.service import get_client_ip
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from django.db.models import Avg


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





class ProductsUploadSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)

    # rating_user = serializers.BooleanField()
    average_rating= serializers.SerializerMethodField()
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)
    class Meta:
        model = Products
        fields = ["producttitle","price","sellerID","quantity","pddesc","categoryID", "images","uploaded_images","average_rating"]
        # "rating_user","middle_star"
        extra_kwargs = {"user":{"read_only":True}}
        
    def create(self,validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        validated_data['sellerID'] = self.context['request'].user
        product = Products.objects.create(**validated_data)
        for image in uploaded_images:
            newproduct_image = ProductImages.objects.create(product=product, image=image)
        return product

    def get_average_rating(self,obj):
        
        av = Products.objects.filter(producttitle=obj.producttitle).aggregate(Avg('ratings'))['ratings__avg']
        # av = Products.objects.all().annotate(average_rating=models.Sum(models.F('ratings__star')) / models.Count(models.F('ratings')))
     

        if av == None:
            return 0
        return av

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields = '__all__'

    def create(self,validated_data):
        comment = Comments.objects.create(**validated_data)
        return comment

# class RatingSerializer(serializers.ModelSerializer):

#     avg_rating =
#     class Meta:


class CreateRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rating
        fields=['star','ProductID']
    def create(self,validated_data):
        print(validated_data)
        rating =Rating.objects.create(
            ip=get_client_ip(self.context['request']),
            ProductID=validated_data.get("ProductID",None),
            star=validated_data.get("star",None))

        return rating

