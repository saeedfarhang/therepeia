from rest_framework.routers import DefaultRouter
from .views import ProductsViewSet, CategoryViewSet, ProductSearchView,ExcelProduct,ProductsList
from django.urls import path

router = DefaultRouter()
router.register('product', ProductsViewSet, basename = 'products')
router.register('category', CategoryViewSet, basename = 'category')
urlpatterns = router.urls

urlpatterns += [
    path('list/', ProductsList.as_view()),
    path('search/', ProductSearchView.as_view()),
    path('excel/', ExcelProduct.as_view())
]