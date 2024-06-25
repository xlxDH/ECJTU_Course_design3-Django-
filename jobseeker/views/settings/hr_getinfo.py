from django.http import JsonResponse
from jobseeker.models.companys.company import Company

def getinfo_app(request):
    company = Company.objects.all()[0]
    return JsonResponse({
        'result' : "success",
        'username' : company.user.username,
        'photo' : company.photo,
    })

def getinfo_web(request):
    user = request.user

    if not user.is_authenticated:
        return JsonResponse({
            'result': "未登录"
        })
    else:
        company = Company.objects.get(user=user)
        return JsonResponse({
            'result' : "success",
            'id': company.id,
            'username' : company.user.username,
            'photo' : company.photo,
            'phone': company.phone,
            'residence': company.residence,
            'desired_job': company.desired_job,
            'expected_salary': company.expected_salary,
            'work_location': company.work_location,
            'bio': company.bio,
            'resume': company.resume,
        })

def hr_getinfo(request) :
    platform = 'WEB'
    if platform == 'APP':
        return getinfo_app(request)
    else:
        return getinfo_web(request)
