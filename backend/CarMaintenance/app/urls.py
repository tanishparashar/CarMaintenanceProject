# carmaintenance/views/urls.py
from django.urls import path
from .views import user, car, predicitve_maintenance

urlpatterns = [
    # User URLs
    path('users/', user.UserListCreateAPIView.as_view(), name='user-list-create'),
    path('users/<int:pk>/', user.UserRetrieveUpdateDestroyAPIView.as_view(), name='user-retrieve-update-destroy'),
    path('users/login/', user.LoginUserView.as_view(), name='user-login'),
    path('users/logout/', user.LogoutView.as_view(), name='user-logout'),

    # Car URLs
    path('cars/', car.CarListCreateAPIView.as_view(), name='car-list-create'),
    path('cars/<int:pk>/', car.CarRetrieveUpdateDestroyAPIView.as_view(), name='car-retrieve-update-destroy'),
    path('cars/usercarslist/', car.UserCarsListAPIView.as_view(), name='car-user-list'),


    # PredictiveMaintenance URLs
    path('predictive/<int:pk>', predicitve_maintenance.PredictiveMaintenanceListCreateAPIView.as_view(), name='predictive-maintenance-list-create'),
    path('predictive/<int:pk>/', predicitve_maintenance.PredictiveMaintenanceRetrieveUpdateDestroyAPIView.as_view(), name='predictive-maintenance-retrieve-update-destroy'),
    path('predictive/carpredictivelist/<int:pk>/', predicitve_maintenance.CarPredictiveMaintenanceListAPIView.as_view(), name='predictive-car-list'),
    # path('predictive/report/<int:pk>', predicitve_maintenance.PredictiveMaintenanceReportAPIView.as_view(), name='predictive-report'),

    # # MaintenanceRecord URLs
    # path('maintenance/', maintenance.MaintenanceRecordListCreateAPIView.as_view(), name='maintenance-record-list-create'),
    # path('maintenance/<int:pk>/', maintenance.MaintenanceRecordRetrieveUpdateDestroyAPIView.as_view(), name='maintenance-record-retrieve-update-destroy'),

    # # Alert URLs
    # path('alerts/', alert.AlertListCreateAPIView.as_view(), name='alert-list-create'),
    # path('alerts/<int:pk>/', alert.AlertRetrieveUpdateDestroyAPIView.as_view(), name='alert-retrieve-update-destroy'),

    # # Notification URLs
    # path('notifications/', notification.NotificationListCreateAPIView.as_view(), name='notification-list-create'),
    # path('notifications/<int:pk>/', notification.NotificationRetrieveUpdateDestroyAPIView.as_view(), name='notification-retrieve-update-destroy'),

    # # CostEstimation URLs
    # path('costs/', cost_estimation.CostEstimationListCreateAPIView.as_view(), name='cost-estimation-list-create'),
    # path('costs/<int:pk>/', cost_estimation.CostEstimationRetrieveUpdateDestroyAPIView.as_view(), name='cost-estimation-retrieve-update-destroy'),

    # # FuelEfficiency URLs
    # path('fuel/', fuel_efficiency.FuelEfficiencyListCreateAPIView.as_view(), name='fuel-efficiency-list-create'),
    # path('fuel/<int:pk>/', fuel_efficiency.FuelEfficiencyRetrieveUpdateDestroyAPIView.as_view(), name='fuel-efficiency-retrieve-update-destroy'),
]
