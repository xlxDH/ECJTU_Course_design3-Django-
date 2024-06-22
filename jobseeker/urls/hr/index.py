from django.urls import path
from jobseeker.views.hr.index import hr

urlpatterns = [
    path("",hr,name="hr"),
]
