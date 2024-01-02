from django.http import JsonResponse
from ..models import Product
from ..serializers import ProductSerializer
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.views import View

class ProductController(View):
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

    def __call__(self,request, id=None):

        fields = [field.name for field in Product._meta.get_fields()]
        # Select the correct method according to the request
        if(id):
            response = self.DETAIL_METHOD_MAP[request.method](request=request, id=id)
        else:
            response = self.METHOD_MAP[request.method](request=request)
        return response

    #GET (without id)
    def list(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
    
    #POST
    def upload(self, request):
        permission_classes = (IsAuthenticated,)

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
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    #DELETE
    def remove(self, request, id):
        product = Product.objects.get(pk=id)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    