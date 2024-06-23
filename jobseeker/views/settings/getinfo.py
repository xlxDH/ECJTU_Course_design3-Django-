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
            'id' : jobseeker.id,
            'result' : "success",
            'username' : jobseeker.user.username,
            'photo' : jobseeker.photo,
            'phone': jobseeker.phone,
            'sex': jobseeker.sex,
            'residence': jobseeker.residence,
            'graduation_year': jobseeker.graduation_year,
            'education_level': jobseeker.education_level,
            'graduation_school': jobseeker.graduation_school,
            'desired_job': jobseeker.desired_job,
            'expected_salary': jobseeker.expected_salary,
            'job_status': jobseeker.job_status,
            'work_location': jobseeker.work_location,
            'bio': jobseeker.bio,
            'resume': jobseeker.resume,
        })

def getinfo(request) :
    platform = request.GET.get('platform')
    if platform == 'APP':
        return getinfo_app(request)
    else:
        return getinfo_web(request)
