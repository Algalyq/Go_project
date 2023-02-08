from rest_framework import serializers


from furni.models import Products, Comments, RatingStar,Rating

class ProductsSerializer(serializers.ModelSerializer):
    rating_user = serializers.BooleanField()
    middle_star= serializers.IntegerField()
    class Meta:
        model = Products
        fields = ('producttitle','price','imageNo1', 'rating_user', 'middle_star')


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
        fields = ['producttitle','price','imageNo1','review']

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

