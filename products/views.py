from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer
from rest_framework import permissions
from .models import Product, Category

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class CategoryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser|ReadOnly]

    def list(self,request):
        category_queryset = Category.objects.all()
        category_serializer = CategorySerializer(category_queryset, many=True)
        return Response(category_serializer.data)

    def retrieve(self,request,pk):
        category_queryset = Category.objects.get(pk=pk)
        category_serializer = CategorySerializer(category_queryset)

        products = Product.objects.filter(category=category_queryset)
        product_serializer = ProductSerializer(products, many=True)


        return Response({'category':category_serializer.data,'products':product_serializer.data})

    def create(self, request):
        data = self.request.data
        category = Category.objects.get_or_create(
            fa_name = data['fa_name'],
            en_name = data['en_name'],
            description = data['description']
        )
        return Response({'success':'category been created'})

    def update(self, request, pk=None):
        data = self.request.data
        category = Category.objects.filter(pk=pk)
        category.update(
            fa_name = data['fa_name'],
            en_name = data['en_name'],
            description = data['description'],
        )
        return Response({'success':'category been updated'})

    def destroy(self, request, pk):
        category = Category.objects.get(pk=pk).delete()
        return Response({'success':'category been deleted'})




class ProductsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser|ReadOnly]


    def list(self,request):
        product_queryset = Product.get_published(Product)
        product_serializer = ProductSerializer(product_queryset, many=True)
        return Response(product_serializer.data)

    
    def retrieve(self,request,pk):
        product_queryset = Product.get_published(Product).get(pk=pk)
        product_serializer = ProductSerializer(product_queryset)
        return Response(product_serializer.data)


    def create(self, request):
        data = self.request.data
        category = Category.objects.get(pk=data['category'])
        product = Product.objects.get_or_create(
            fa_name = data['fa_name'],
            en_name = data['en_name'],
            description = data['description'],
            category = category,
        )
        return Response({'success':'object been created'})

    def destroy(self, request, pk):
        product = Product.objects.get(pk=pk).delete()
        return Response({'success':'object been deleted'})
    
    def update(self, request, pk=None):
        data = self.request.data
        category = Category.objects.get(pk=data['category'])
        product = Product.objects.filter(pk=pk)
        product.update(
            fa_name = data['fa_name'],
            en_name = data['en_name'],
            description = data['description'],
            category = category,

        )
        
        return Response({'success':'object been updated'})

