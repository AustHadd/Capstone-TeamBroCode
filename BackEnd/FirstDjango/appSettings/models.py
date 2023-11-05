from django.db import models

# Create your models here.


class Setting(models.Model):
    # standart, if password could be shorter
    name = models.CharField(max_length=256, blank=False,
                            null=False, default="Settings_name")
    value = models.CharField(
        max_length=256, blank=True, null=False, default='')
