# parking/models.py

from django.db import models

class Car(models.Model):
    plate_number = models.CharField(max_length=15)
    color = models.CharField(max_length=20)
    spot_number = models.IntegerField()

    def __str__(self):
        return self.plate_number
