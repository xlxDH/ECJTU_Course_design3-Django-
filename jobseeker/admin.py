from django.contrib import admin
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.companys.company import Company

admin.site.register(Jobseeker)
admin.site.register(Company)
# Register your models here.
