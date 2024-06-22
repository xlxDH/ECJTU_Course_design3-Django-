from django.db import models

class Employer(models.Model):
    employer_id = models.AutoField(primary_key=True)
    company_name = models.CharField(max_length=100)
    industry_field = models.CharField(max_length=100)
    registered_capital = models.DecimalField(max_digits=15, decimal_places=2)
    contact_person = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, unique=True)
    address = models.CharField(max_length=200)
    website = models.URLField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.company_name
