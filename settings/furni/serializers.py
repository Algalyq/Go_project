from rest_framework import serializers


from furni.models import *


class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImages
        fields = ["id","product","image"]



class ProductsUploadSerializer(serializers.ModelSerializer):
    images = ProductImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child = serializers.ImageField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only=True)
    class Meta:
        model = Products
        fields = ["producttitle","price","sellerID","categoryID", "images","uploaded_images"]

        
    def create(self,validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Products.objects.create(
            producttitle=validated_data.get('producttitle',None),
            price=validated_data.get('price',None),
            sellerID=self.context['request'].user,
            categoryID=validated_data.get('categoryID',None),
            uploaded_images=validated_data.get('uploaded_images',None)
        )
        for image in uploaded_images:
            newproduct_image = ProductImages.objects.create(product=product, image=image)
        return product

class ProductsSerializer(serializers.ModelSerializer):
    rating_user = serializers.BooleanField(default=False)
    middle_star= serializers.IntegerField(default=0)
    class Meta:
        model = Products
        fields = ["producttitle","price", "rating_user","middle_star"]

class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields = '__all__'

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model=Comments
        fields = '__all__'

class ProductsDetailSerializer(serializers.ModelSerializer):
    review=ReviewSerializer(many=True)
    class Meta:
        model = Products
        fields = ['producttitle','price','review']

class CreateRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Rating
        fields=['star','ProductID']
    def create(self,validated_data):
        rating =Rating.objects.update_or_create(
            ip=validated_data.get('ip',None),
            ProductID=validated_data.get("ProductID",None),
            defaults={'star':validated_data.get("star")}
        )
        return rating

