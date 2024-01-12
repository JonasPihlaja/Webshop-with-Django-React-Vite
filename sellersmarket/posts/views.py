from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .controllers.ProductController import ProductController
from .controllers.UserController import UserController
from .controllers.CartController import CartController

#@permission_classes([IsAuthenticated])
@api_view(['GET', 'POST'])
def product(request):
    instance = ProductController()
    response = instance(request=request)
    return response

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def product_detail(request, id=None, user=None):
    instance = ProductController()
    response = instance(request=request, id=id, user=user)
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def product_search(request, search=None):
    instance = ProductController()
    response = instance(request=request, search=search)
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
@permission_classes([IsAuthenticated])
def password(request):
    instance = UserController()
    response = instance(method = "password", request=request)
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def cart(request, user):
    instance = CartController()
    response = instance(request=request, user=user)
    return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def cart_pay(request, user):
    instance = CartController()
    response = instance(method='PAY', request=request, user=user)
    return response

@api_view(['GET','POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def cart_detail(request, user, id):
    instance = CartController()
    response = instance(request=request, user=user, id=id)
    return response