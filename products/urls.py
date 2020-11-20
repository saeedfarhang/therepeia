from rest_framework.routers import DefaultRouter
from .views import ProductsViewSet, CategoryViewSet

router = DefaultRouter()
router.register('product', ProductsViewSet, basename = 'products')
router.register('category', CategoryViewSet, basename = 'category')
urlpatterns = router.urls