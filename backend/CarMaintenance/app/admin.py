from django.contrib import admin
from .models import CustomUser, Car, MaintenanceRecord, PredictiveMaintenance, Alert, Notification, CostEstimation, FuelEfficiency

class CustomUserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'first_name', 'last_name', 'is_staff']

admin.site.register(CustomUser, CustomUserAdmin)


class CarAdmin(admin.ModelAdmin):
    list_display = ['owner', 'make', 'model', 'year']

admin.site.register(Car, CarAdmin)

class MaintenanceRecordAdmin(admin.ModelAdmin):
    list_display = ['car', 'maintenance_type', 'maintenance_date', 'cost']

admin.site.register(MaintenanceRecord, MaintenanceRecordAdmin)

class PredictiveMaintenanceAdmin(admin.ModelAdmin):
    list_display = ['car', 'next_maintenance_date', 'prediction_accuracy']

admin.site.register(PredictiveMaintenance, PredictiveMaintenanceAdmin)

class AlertAdmin(admin.ModelAdmin):
    list_display = ['car', 'message', 'created_at', 'is_read']

admin.site.register(Alert, AlertAdmin)

class NotificationAdmin(admin.ModelAdmin):
    list_display = ['user', 'message', 'created_at', 'is_read']

admin.site.register(Notification, NotificationAdmin)

class CostEstimationAdmin(admin.ModelAdmin):
    list_display = ['car', 'maintenance_type', 'estimated_cost']

admin.site.register(CostEstimation, CostEstimationAdmin)

class FuelEfficiencyAdmin(admin.ModelAdmin):
    list_display = ['car', 'fuel_consumption']

admin.site.register(FuelEfficiency, FuelEfficiencyAdmin)
