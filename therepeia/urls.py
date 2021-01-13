from django.contrib import admin
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.conf import settings
from django.conf.urls.static import static
from frontend.views import index

urlpatterns = [
    path('api-auth', include('rest_framework.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refrwsh', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/accounts/', include('account.urls')),
    path('api/products/', include('products.urls')),
    path('', include('frontend.urls')),
    path('superadmin/', admin.site.urls),
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



urlpatterns += [re_path('.*/', index, name='index')]