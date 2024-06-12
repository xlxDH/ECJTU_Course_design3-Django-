from django.shortcuts import render

def index(request):
    return render(request, "multiends/login2.html")
