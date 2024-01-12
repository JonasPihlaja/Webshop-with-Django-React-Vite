"""
URL configuration for sellersmarket project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from django.views.static import serve
from django.views.generic import TemplateView
from django.conf import settings
from rest_framework_simplejwt import views as jwt_views

from posts import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/products/", views.product),
    path('api/products/<int:id>', views.product_detail),
    path('api/products/<str:user>', views.product_detail),
    path('api/products/search/<str:search>', views.product_search),
    path("api/cart/<str:user>", views.cart),
    path("api/cart/pay/<str:user>", views.cart_pay),
    path("api/cart/<str:user>/<int:id>", views.cart_detail),
    path('api/token/', 
          jwt_views.TokenObtainPairView.as_view(), 
          name ='token_obtain_pair'),
    path('api/token/refresh/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh'),
    path('api/logout/', views.logout, name ='logout'),
    path('api/register/', views.register, name ='register'),
    path('api/password/', views.password, name ='password'),
    path('api/populate/', views.populate, name ='populate'),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
    re_path(r"^.*$", TemplateView.as_view(template_name="base.html")),
]
