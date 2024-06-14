from django.urls import path
from jobseeker.views.menu.index import menu

urlpatterns = [
    path("",menu,name="menu"),
]

