import random
from django.contrib.auth.models import User
from django.db import IntegrityError
from ..models import Product
from ..serializers import PasswordSerializer
from rest_framework import authentication, permissions, status
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from django.views import View
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

class UserController(View):
    def __init__(self) -> None:
        # Might be generalised and moved further down the line
        self.METHOD_MAP = {
            'register': self.register,
            'populate': self.populate,
            'logout': self.logout,
            'password': self.password,
        }

    def __call__(self, method, request, id=None):
        # Select the correct method according to the request
        response = self.METHOD_MAP[method](request=request)
        return response
    
    def populate(self, request):
        # clearing the DB
        User.objects.all().delete()
        Product.objects.all().delete()

        #populating with no_u and no_p products each
        # no_u number of users
        # no_p number of products
        total_no_u = 6
        no_u_with_p = 3
        no_p = 10
        try:
            description_list = ['Big and round', 'Great for all ages!', 'Amazing shape', 'Lightly used', 'The color has slightly faded', 'A great addition to your arsenal']
            product_list = ['White toyota', 'Flower vase', 'Coffee machine', 'Head of lettuce', 'Mountain bike', 'Jeans', 'Cardigan', 'Sheet of paper', 'Map', 'Book about monsters', 'Apple']
            for n in range(total_no_u):
                user = User.objects.create_user("testuser{}".format(n), "testuser{}@shop.aa".format(n), "pass{}".format(n))
                user.save()
                instance_copy = product_list.copy()
                if(n >= no_u_with_p):
                    for i in range(no_p):
                        random_product = random.choice(instance_copy)
                        random_product_description = "A sample description of {}. {}.".format(random_product, random.choice(description_list))
                        price = random.randint(1,150)
                        item = Product(name=random_product, description=random_product_description, owner=user, price=price)
                        item.save()
                        instance_copy.remove(random_product)
            message = "populated with {} users and gave {} users {} products each".format(total_no_u, no_u_with_p, no_p)

            # Re-create a super user as well
            User.objects.create_superuser(username='admin', email='admin@sellersmarket.fi', password='masterkey')
        except Exception as e:
            message = "Populate failed:  " + str(e)
        return JsonResponse({"message": message})

    def register(self, request, format=None):
        serializer = RegisterSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=400)
        try:
            user = User.objects.create_user(
                username=serializer.data["username"],
                email=serializer.data["email"],
                password=serializer.data["password"],
            )
        except IntegrityError:
            return Response(f"same user name", status=400)
        if user is not None:
            return Response(f"new user is: {user.get_username()}")
        return Response("no new user")
    
    def logout(self, request):
        permission_classes = (IsAuthenticated,)
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
    def password(self, request):
        permission_classes = (IsAuthenticated,)
        
        serializer = PasswordSerializer(data=request.data)
        serializer.is_valid()
        new_password = request.data['newPassword']        
        try:
            user = User.objects.get(username=serializer.data['username'])
            correct = user.check_password(serializer.data['password'])
            if(correct):
                user.set_password(new_password)
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)