from django.db import models
from django.contrib.auth.models import User
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.companys.company import Company

class Form(models.Model):
    jobseeker = models.ForeignKey(Jobseeker, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    job_position = models.CharField(max_length=255,blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    location = models.CharField(max_length=255)
    is_jobseeker_approved = models.BooleanField(default=False)
    is_company_approved = models.BooleanField(default=False)

    def __str__(self):
        return str(self.company)
