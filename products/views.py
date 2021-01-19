from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from .serializers import ProductSerializer, CategorySerializer
from rest_framework import permissions
from .models import Product, Category
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination

class ReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS


class CategoryViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser|ReadOnly]
    parser_classes = [MultiPartParser, FormParser]

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
        serializer = CategorySerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

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


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

class ProductsList(ListAPIView):
    queryset = Product.objects.all().order_by('-date_added')
    serializer_class = ProductSerializer
    pagination_class = StandardResultsSetPagination
    


class ProductsViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAdminUser|ReadOnly]
    parser_classes = [MultiPartParser, FormParser]


    def list(self,request):
        product_queryset = Product.objects.all().order_by('-date_added')
        product_serializer = ProductSerializer(product_queryset, many=True)
        return Response(product_serializer.data)

    
    def retrieve(self,request,pk):
        product_queryset = Product.objects.get(pk=pk)
        product_serializer = ProductSerializer(product_queryset)
        cat = product_queryset.category
        category_serializer = CategorySerializer(cat)
        return Response({"product":product_serializer.data,"category":category_serializer.data})
        # return Response()



    def create(self, request):
        data = request.data
        serializer = ProductSerializer(data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)

    def destroy(self, request, pk):
        product = Product.objects.get(pk=pk).delete()
        return Response({'success':'object been deleted'})
    
    def update(self, request, pk=None):
        data = self.request.data
        product = Product.objects.get(pk=pk)
        cat = product.category
        category_serializer = CategorySerializer(cat)
        serializer = ProductSerializer(product ,data = data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors)
            

class ProductSearchView(APIView):
    def get(self, request):
        searchin = request.GET.get('in', None)
        query = request.GET.get('q', None)
        print(searchin,' ',query)
        if searchin == 'fa_name':
            queryset = Product.objects.filter(fa_name__contains=query)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data)
        if searchin == 'en_name':
            queryset = Product.objects.filter(en_name__contains=query)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data)
        if searchin == 'description':
            queryset = Product.objects.filter(description__contains=query)
            serializer = ProductSerializer(queryset, many=True)
            return Response(serializer.data)

from .excel_to_dict import excel_to_dict
import json
class ExcelProduct(APIView):
    def post(self, request):
        data = request.data
        serializer_data = []
        items_en_name = []
        try:
            dd = excel_to_dict(data['file'].file)
        except expression as e:
            return(e)
        
        for item in dd:
            
            serializer = ProductSerializer(data = item)
            if serializer.is_valid():
                serializer.save()
                serializer_data.append(serializer.data)
            else:
                return Response(serializer.errors)
        

        for item in serializer_data:
            items_en_name.append(item['en_name'])

        return Response(items_en_name)


        # for key in dd:
        #     print(dd[key])
        #     # data = dd[key]
        #     serializer = ProductSerializer(data = data)
        #     if serializer.is_valid():
        #         serializer.save()
        #     else:
        #         return Response(serializer.errors)
        
        # return Response(serializer.data)
