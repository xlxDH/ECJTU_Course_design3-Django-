from django.db import models
from .employer import Employer

class JobVacancy(models.Model):
    vacancy_id = models.AutoField(primary_key=True)
    employer = models.ForeignKey(Employer, on_delete=models.CASCADE)
    job_title = models.CharField(max_length=100)
    job_location = models.CharField(max_length=100)
    salary_range = models.CharField(max_length=50)
    vacancies_number = models.IntegerField()
    publish_date = models.DateField()
    deadline = models.DateField()
    job_description = models.TextField()

    def __str__(self):
        return self.job_title
