from django.urls import path
from jobseeker.views.settings.getinfo import getinfo
from jobseeker.views.settings.login import signin
from jobseeker.views.settings.register import register

urlpatterns = [
    path("getinfo/",getinfo,name="settings_getinfo"),
    path("login/", signin ,name="settings_login"),
    path("register/",register,name="settings_register"),
]

