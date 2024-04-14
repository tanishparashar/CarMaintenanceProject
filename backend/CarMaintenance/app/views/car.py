# carmaintenance/views/car.py
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from ..models import Car
from ..serializers import CarSerializer

class CarListCreateAPIView(generics.ListCreateAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class CarRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Car.objects.all()
    serializer_class = CarSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

class UserCarsListAPIView(generics.ListAPIView):
    serializer_class = CarSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Car.objects.filter(owner=user)