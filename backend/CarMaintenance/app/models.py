from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _



class CustomUser(AbstractUser):
    # username = None
    email = models.EmailField(unique=True)
    username = models.CharField(unique=True, max_length=16)


    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=True)

# Add unique related_name attributes to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name=_('groups'),
        blank=True,
        related_name='custom_user_groups',
        related_query_name='custom_user_group',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name=_('user permissions'),
        blank=True,
        related_name='custom_user_permissions',
        related_query_name='custom_user_permission',
    )


    # USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    # objects = UserManager()

    def __str__(self):
        return self.username or ''
    pass



class Car(models.Model):
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    make = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    year = models.PositiveIntegerField()

class MaintenanceRecord(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    maintenance_type = models.CharField(max_length=100)
    maintenance_date = models.DateField()
    cost = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.car} - {self.maintenance_type}"

class PredictiveMaintenance(models.Model):
    car = models.OneToOneField(Car, on_delete=models.CASCADE)
    next_maintenance_date = models.DateField()
    prediction_accuracy = models.FloatField()
    # Add more fields related to predictive maintenance

class Alert(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class Notification(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

class CostEstimation(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE)
    maintenance_type = models.CharField(max_length=100)
    estimated_cost = models.DecimalField(max_digits=10, decimal_places=2)
    # Add more fields related to cost estimation

class FuelEfficiency(models.Model):
    car = models.OneToOneField(Car, on_delete=models.CASCADE)
    fuel_consumption = models.DecimalField(max_digits=5, decimal_places=2)
    # Add more fields related to fuel efficiency
