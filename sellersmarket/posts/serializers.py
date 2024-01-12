from rest_framework import serializers
from .models import Product, Cart
from django.contrib.auth.models import User


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'owner', 'price', 'updated', 'created', 'status']

class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)
    serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Cart
        fields = ['id', 'product', 'user', 'created', 'updated', 'bought']

class AddToCartSerializer(serializers.ModelSerializer):
    serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = Cart
        fields = ['id', 'product', 'user', 'created', 'updated', 'bought']

class CartPageSerializer(serializers.ModelSerializer):
    product = ProductSerializer(many=False)

    class Meta:
        model = Cart
        fields = ['id', 'product', 'user', 'created', 'updated', 'bought']

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "password"]

class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password"]