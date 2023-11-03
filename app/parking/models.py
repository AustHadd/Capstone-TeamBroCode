from django.db import models

class ParkingFacility(models.Model):
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    capacity = models.IntegerField()
    available_spaces = models.IntegerField()

    def __str__(self):
        return self.name
