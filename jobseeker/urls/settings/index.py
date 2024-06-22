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
]

