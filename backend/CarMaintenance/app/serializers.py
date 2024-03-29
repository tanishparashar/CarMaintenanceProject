from rest_framework import serializers
from .models import CustomUser, Car, MaintenanceRecord, PredictiveMaintenance, Alert, Notification, CostEstimation, FuelEfficiency

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'

class CarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Car
        fields = '__all__'

class MaintenanceRecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaintenanceRecord
        fields = '__all__'

class PredictiveMaintenanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = PredictiveMaintenance
        fields = '__all__'

class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

class CostEstimationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CostEstimation
        fields = '__all__'

class FuelEfficiencySerializer(serializers.ModelSerializer):
    class Meta:
        model = FuelEfficiency
        fields = '__all__'
