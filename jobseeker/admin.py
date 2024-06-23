from django.contrib import admin
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.companys.company import Company
from jobseeker.models.forms.form import Form

admin.site.register(Jobseeker)
admin.site.register(Company)
admin.site.register(Form)

# Register your models here.
