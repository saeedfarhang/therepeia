from django.contrib.auth import get_user_model
User = get_user_model()
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions
from rest_framework import status
from rest_framework import generics
from .serializers import UserSerializer

class SignupView(APIView):
    permission_classes = (permissions.AllowAny, )
    def post(self, request, format=None):
        data = self.request.data

        email = data['email']
        name = data['name']
        password = data['password']
        password2 = data['password2']

        if password == password2:
            if User.objects.filter(email = email).exists():
                return Response({'error':'this email is already exists'})
            else:
                if len(password) < 6:
                    return Response({'error':'password is too short'})
                else:
                    user = User.objects.create_user(email = email, name = name , phone = phone , password = password)
                    user.save()

                    return Response(status.HTTP_200_OK)
        else:
            return Response({'error':'passwords didnt match'})


class retriveUser(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request , id):
        query = User.objects.get(id = id)
        serializer = UserSerializer(query, many=False)
        return Response(serializer.data)