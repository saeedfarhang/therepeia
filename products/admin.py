from django.contrib import admin
from .models import Product,Category

class ProductAdmin(admin.ModelAdmin):
    list_display=('fa_name',"en_name")
    search_fields=('fa_name',"en_name")

admin.site.register(Product, ProductAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display=('fa_name',"en_name")
    search_fields=('fa_name',"en_name")

admin.site.register(Category, CategoryAdmin)