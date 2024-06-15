from django.db import models
from django.contrib.auth.models import User

class Jobseeker(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.URLField(max_length=256, blank=True)
    phone = models.CharField(max_length=20,blank=True)
    sex = models.CharField(max_length=10,choices=[('M','Male'),('F','Female')],blank=True)
    residence = models.CharField(max_length=255, blank=True)
    graduation_year = models.IntegerField(default=2024)
    education_level = models.CharField(max_length=50, blank=True)
    graduation_school = models.CharField(max_length=255, blank=True)
    desired_job = models.CharField(max_length=255, blank=True)
    expected_salary = models.CharField(max_length=50, blank=True)
    job_status = models.CharField(max_length=20, choices=[('seeking', '求职中'), ('employed', '在职')], blank=True)
    work_location = models.CharField(max_length=255, blank=True)
    bio = models.TextField(blank=True)
    resume = models.URLField(max_length=256, blank=True)

    def __str__(self):
        return str(self.user)
