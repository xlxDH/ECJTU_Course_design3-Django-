from django.urls import path
from jobseeker.views import *

urlpatterns = [
    path("",index,name="index"),
    path("play/", play ,name="play")
    #path("regiest/",regiest),
]
