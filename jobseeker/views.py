from django.http import HttpResponse

def index(request):
    return HttpResponse("first web!!!")

def play(request):
    return HttpResponse("login!!!")

def regiest(request):
    return HttpResponse("regiest!!!")
