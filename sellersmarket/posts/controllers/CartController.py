from django.forms import ValidationError
from django.http import JsonResponse
from ..models import Cart, Product
from ..serializers import CartPageSerializer, CartSerializer, AddToCartSerializer
from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.views import View
from django.shortcuts import get_object_or_404
from django.utils import dateparse

class CartController(View):
    def __init__(self) -> None:

        self.METHOD_MAP = {
            'GET': self.list,
        }

        self.DETAIL_METHOD_MAP = {
            'POST': self.upload,
            'GET': self.show,
            'PUT': self.update,
            'DELETE': self.remove,
        }

        self.SPEICAL_METHOD_MAP = {
            'PAY': self.pay,
        }

    def __call__(self, request, user, id=None, method=None):
        # Select the correct method according to the request
        if(id):
            response = self.DETAIL_METHOD_MAP[request.method](request=request, user=user, id=id)
        elif(method):
            response = self.SPEICAL_METHOD_MAP[method](request=request, user=user)
        else:
            response = self.METHOD_MAP[request.method](request=request, user=user)
        return response

    def cart_entry_exists(self, p_id, username):
        # Get the user object based on the provided username
        user = get_object_or_404(User, username=username)

        # Check if a cart entry exists with the specified product and user
        cart_entry_exists = Cart.objects.filter(product=p_id, user=user).exists()

        return cart_entry_exists

    #GET (without id)
    def list(self, request, user):
        cart = Cart.objects.filter(user=user, bought=False)
        serializer = CartPageSerializer(cart, many=True)
        return Response(serializer.data)
    
    #POST
    def upload(self, request, user, id):
        request_data = request.data.copy()

        request_data['product'] = id
        actual_user = User.objects.get(username=user)
        request_data['user'] = actual_user.username

        if(self.cart_entry_exists(p_id=id, username=user)):
            print('Already exists')
            return Response(status=status.HTTP_400_BAD_REQUEST)

        serializer = AddToCartSerializer(data=request_data)
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
        serializer = CartSerializer(product)
        return Response(serializer.data)

    #PUT
    def update(self, request, id):
        try:
            product = Product.objects.get(pk=id)
        except Product.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        serializer = CartSerializer(product, data=request.data)
        if(serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    #DELETE
    def remove(self, request, user, id):
        cart = Cart.objects.get(product=id, user=user)
        cart.delete()
        return self.list(request=request, user=user)
    
    # PUT
    def pay(self, request, user):
        started = dateparse.parse_datetime(request.data.get('started'))

        to_save = []
        cart_entries = request.data.get('products', [])
        for json in cart_entries:
            try:
                cart_entry = Cart.objects.get(pk=json['id'], user=user)
                cart_entry.bought = True

                product = Product.objects.get(pk=json['product']['id'])

                if(product.status == 'SOLD'):
                    raise ValidationError("Product is already sold.")
                if(product.updated > started):
                    raise ValidationError("Proudct has been updated, fetching updated product...")
                
                product.status = 'SOLD'

                to_save.append(cart_entry)
                to_save.append(product)
            except Cart.DoesNotExist:
                return Response(status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"An error occurred: {e}")
                return Response(e, status=status.HTTP_400_BAD_REQUEST)
            
        for entry in to_save:
            entry.save()

        return self.list(request=request, user=user)
    