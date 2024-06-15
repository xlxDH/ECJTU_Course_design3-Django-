from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jobseeker.models.jobseekers.jobseekers import Jobseeker

def updateinfo(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({'result': '未登录'})

    try:
        jobseeker = Jobseeker.objects.get(user=user)
        jobseeker.phone = request.GET.get('phone')
        jobseeker.sex = request.GET.get('sex')
        jobseeker.residence = request.GET.get('residence')
        jobseeker.graduation_year = request.GET.get('graduation_year')
        jobseeker.education_level = request.GET.get('education_level')
        jobseeker.graduation_school = request.GET.get('graduation_school')
        jobseeker.desired_job = request.GET.get('desired_job')
        jobseeker.expected_salary = request.GET.get('expected_salary')
        jobseeker.job_status = request.GET.get('job_status')
        jobseeker.work_location = request.GET.get('work_location')
        jobseeker.bio = request.GET.get('bio')
        jobseeker.photo = request.GET.get('photo')
        jobseeker.resume = request.GET.get('resume')

        jobseeker.save()
        return JsonResponse({'result': 'success'})
    except Jobseeker.DoesNotExist:
        return JsonResponse({'result': '用户信息未找到'})

