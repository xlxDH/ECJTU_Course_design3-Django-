from django.http import JsonResponse
from jobseeker.models.jobseekers.jobseekers import Jobseeker

def getinfo_app(request):
    jobseeker = Jobseeker.objects.all()[0]
    return JsonResponse({
        'result' : "success",
        'username' : jobseeker.user.username,
        'photo' : jobseeker.photo,
    })

def getinfo_web(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        jobseeker = Jobseeker.objects.get(user=user)
        return JsonResponse({
            'result' : "success",
            'username' : jobseeker.user.username,
            'photo' : jobseeker.photo,
        })

def getinfo(request) :
    platform = request.GET.get('platform')
    if platform == 'APP':
        return getinfo_app(request)
    else:
        return getinfo_web(request)
