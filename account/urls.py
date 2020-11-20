from django.urls import path
from .views import SignupView, retriveUser

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('getuser/<id>/', retriveUser.as_view())
]