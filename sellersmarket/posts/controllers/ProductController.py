from django.http import JsonResponse
from ..models import Product, Cart
from ..serializers import ProductSerializer, CartSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.views import View
from rest_framework.views import APIView

class ProductController(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self) -> None:

        # Might be generalised and moved further down the line
        self.METHOD_MAP = {
            'GET': self.list,
            'POST': self.upload,
        }

        # DETAIL_METHOD_MAP targets a single existing row
        self.DETAIL_METHOD_MAP = {
            'GET': self.show,
            'PUT': self.update,
            'DELETE': self.remove
        }

        self.USER_METHOD_MAP = {
            'GET': self.user_list,
        }

        self.SEARCH_METHOD_MAP = {
            'GET': self.product_search,
        }

    def __call__(self, request, id=None, user=None, search=None):

        fields = [field.name for field in Product._meta.get_fields()]
        # Select the correct method according to the request
        if(id):
            response = self.DETAIL_METHOD_MAP[request.method](request=request, id=id)
        elif(user):
            response = self.USER_METHOD_MAP[request.method](request=request, user=user)
        elif(search):
            response = self.SEARCH_METHOD_MAP[request.method](request=request, search=search)
        else:
            response = self.METHOD_MAP[request.method](request=request)
        return response
            
    #GET (without id)
    def list(self, request):
        products = Product.objects.filter(status="LISTED")
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    #POST
    def upload(self, request):
        serializer = ProductSerializer(data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
            
    # DETAIL_METHODS
    #GET
    def show(self, request, id):
        try:
            product = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    #PUT
    def update(self, request, id):
        try:
            product = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = ProductSerializer(product, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            product = Product.objects.filter(owner=request.data['username'])
            serializer = ProductSerializer(product, many=True)
            return Response(serializer.data)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    #DELETE
    def remove(self, request, id):
        try:
            product = Product.objects.get(pk=id)
            user = product.owner
            product.delete()
            
            product = Product.objects.filter(owner=user.username)
            serializer = ProductSerializer(product, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    #GET
    def user_list(self, request, user):
        try:
            product = Product.objects.filter(owner=user)
            bought = Cart.objects.filter(user=user, bought=True)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        product_serializer = ProductSerializer(product, many=True)
        bought_serializer = CartSerializer(bought, many=True)

        serialized_data = {
            'products': product_serializer.data,
            'bought': bought_serializer.data
        }
        return Response(serialized_data, status=status.HTTP_200_OK)
    
    def product_search(self, request, search):
        if(search != "null"):
            products = Product.objects.filter(status="LISTED", name__icontains=search)
        else:
            products = Product.objects.filter(status="LISTED")
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    