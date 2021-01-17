from rest_framework.routers import DefaultRouter
from .views import ProductsViewSet, CategoryViewSet, ProductSearchView,ExcelProduct
from django.urls import path

router = DefaultRouter()
router.register('product', ProductsViewSet, basename = 'products')
router.register('category', CategoryViewSet, basename = 'category')
urlpatterns = router.urls

urlpatterns += [
    path('search/', ProductSearchView.as_view()),
    path('excel/', ExcelProduct.as_view())
]