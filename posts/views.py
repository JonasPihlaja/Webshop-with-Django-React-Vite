from django.shortcuts import render
from rest_framework.decorators import api_view
from .controllers.ProductController import ProductController
from .controllers.UserController import UserController
from .controllers.CartController import CartController

@api_view(['GET','POST'])
def product(request):
    instance = ProductController()
    response = instance(request=request)
    return response

@api_view(['GET','PUT', 'DELETE'])
def product_detail(request, id):
    instance = ProductController()
    response = instance(request=request, id=id)
    return response

@api_view(['POST'])
def logout(request):
    instance = UserController()
    response = instance(method = "logout", request=request)
    return response

@api_view(['POST'])
def register(request):
    instance = UserController()
    response = instance(method = "register", request=request)
    return response

@api_view(['POST'])
def populate(request):
    instance = UserController()
    response = instance(method = "populate", request=request)
    return response

@api_view(['POST'])
def password(request):
    instance = UserController()
    response = instance(method = "password", request=request)
    return response

@api_view(['GET'])
def cart(request, user):
    instance = CartController()
    response = instance(request=request, user=user)
    return response

@api_view(['GET','POST', 'DELETE'])
def cart_detail(request, user, id):
    instance = CartController()
    response = instance(request=request, user=user, id=id)
    return response