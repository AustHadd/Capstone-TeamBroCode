# parking_app/models.py
from django.db import models

class ParkingSpace(models.Model):
    number = models.IntegerField(unique=True)
    is_reserved = models.BooleanField(default=False)
