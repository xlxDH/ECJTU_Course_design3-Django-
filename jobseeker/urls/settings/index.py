from django.urls import path
from jobseeker.views.settings.getinfo import getinfo
from jobseeker.views.settings.login import signin
from jobseeker.views.settings.logout import signout
from jobseeker.views.settings.register import register
from jobseeker.views.settings.updateinfo import updateinfo
from jobseeker.views.settings.hr_getinfo import hr_getinfo
from jobseeker.views.settings.hr_updateinfo import hr_updateinfo
from jobseeker.views.settings.hr_register import hr_register
from jobseeker.views.settings.get_companys import get_companys
from jobseeker.views.settings.get_company_details import get_company_details
from jobseeker.views.settings.apply_for_job import apply_for_job
from jobseeker.views.settings.get_applications import get_form
from jobseeker.views.settings.hr_get_applications import hr_get_form
from jobseeker.views.settings.update_application import update_form
from jobseeker.views.settings.hr_update_application import hr_update_form
from jobseeker.views.settings.get_company_name import get_company_name
from jobseeker.views.settings.get_jobseeker_name import get_jobseeker_name

urlpatterns = [
    path("getinfo/",getinfo,name="settings_getinfo"),
    path("login/", signin ,name="settings_login"),
    path("register/",register,name="settings_register"),
    path("logout/",signout,name="settings_logout"),
    path("updateinfo/",updateinfo,name="settings_updateinfo"),
    path("hrgetinfo/",hr_getinfo,name="settings_hrgetinfo"),
    path("hrupdateinfo/",hr_updateinfo,name="settings_hrupdateinfo"),
    path("hrregister/",hr_register,name="settings_hrregister"),
    path("getcompanys/",get_companys,name="settings_getcompanys"),
    path("getcompanydetails/<int:company_id>/",get_company_details,name="settings_getcompanydetails"),
    path("applyforjob/",apply_for_job,name="settings_applyforjob"),
    path("getapplications/<int:jobseeker_id>/",get_form,name="settings_getapplications"),
    path("updateapplication/",update_form,name="settings_updateapplication"),
    path("hrupdateapplication/",hr_update_form,name="settings_hrupdateapplication"),
    path("hrgetapplications/<int:company_id>/",hr_get_form,name="settings_hrgetapplications"),
    path("getcompanyname/",get_company_name,name="settings_getcompanyname"),
    path("getjobseekername/",get_jobseeker_name,name="settings_getjobseekername"),
]

