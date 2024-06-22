from django.urls import path, include
from jobseeker.views.index import index

urlpatterns = [
    path("",index,name="index"),
    path("menu/",include("jobseeker.urls.menu.index")),
    path("jobseeker/", include("jobseeker.urls.jobseeker.index")),
    path("settings/",include("jobseeker.urls.settings.index")),
    path("hr/",include("jobseeker.urls.hr.index")),
]
