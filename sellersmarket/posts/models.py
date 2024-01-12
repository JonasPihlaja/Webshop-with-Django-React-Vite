from django.db import models
from django.conf import settings
from django.contrib.auth.models import User


class Product(models.Model):

    class ProductStatus(models.TextChoices):
        LISTED = 'LISTED'
        SOLD = 'SOLD'
    
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    price = models.IntegerField(default=0)
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=600, default="Description")
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE, default="admin")
    status = models.CharField(
        max_length=10,
        choices=ProductStatus.choices,
        default=ProductStatus.LISTED
    )
    def __str__(self):
        return self.name+' (id: '+str(self.id)+' user: '+self.owner.username+')'
    

class Cart(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, to_field="username", on_delete=models.CASCADE)
    bought = models.BooleanField(default=False)
    def __str__(self):
        return self.product.name+' (id: '+str(self.id)+' owner: '+self.product.owner.username+')'
