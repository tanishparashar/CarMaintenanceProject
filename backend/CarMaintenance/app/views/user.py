# carmaintenance/views/user.py
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.hashers import make_password, check_password
from rest_framework import status




from ..models import CustomUser
from ..serializers import CustomUserSerializer, UserLoginSerializer


class LoginUserView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            print(f"Email: {email}, Password: {password}")  # Debug line
            try:
                user = CustomUser.objects.get(email=serializer.validated_data["email"])
                if check_password(serializer.validated_data["password"], user.password):
                    token = Token.objects.get_or_create(user=user)
                    return Response({"success": True, "token":token[0].key})
                else:
                    return Response({"success": False, "message":"incorrect password"})
                    
            except CustomUser.DoesNotExist:
                return Response({"success": False, "message":"user does not exist"})
        else:
            return Response({"success": False, "message": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"success": True, "message": "Logged out successfully"}, status=status.HTTP_200_OK)



class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    # permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password', None)
        if password is not None:
            serializer.validated_data['password'] = make_password(password)
        serializer.save()

class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]
