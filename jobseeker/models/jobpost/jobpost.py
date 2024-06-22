from django.db import models
from django.contrib.auth.models import User

class JobPost(models.Model):
    title = models.CharField(max_length=100)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
