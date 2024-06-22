from django.db import models
from django.contrib.auth.models import User

class Company(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(max_length=256, blank=True, default="https://tse1-mm.cn.bing.net/th/id/OIP-C.-BD7wuSAaquBdulv7uAHjgHaHa?rs=1&pid=ImgDetMain")
    phone = models.CharField(max_length=20,blank=True)
    residence = models.CharField(max_length=255, blank=True)
    graduation_school = models.CharField(max_length=255, blank=True)
    desired_job = models.CharField(max_length=255, blank=True)
    expected_salary = models.CharField(max_length=50, blank=True)
    work_location = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    resume = models.URLField(max_length=256, blank=True)

    def __str__(self):
        return str(self.user)
