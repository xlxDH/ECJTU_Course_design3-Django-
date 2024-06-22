from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jobseeker.models.companys.company import Company

def hr_updateinfo(request):
    user = request.user
    if not user.is_authenticated:
        return JsonResponse({'result': '未登录'})

    try:
        company = Company.objects.get(user=user)
        company.phone = request.GET.get('phone')
        company.residence = request.GET.get('residence')
        company.desired_job = request.GET.get('desired_job')
        company.expected_salary = request.GET.get('expected_salary')
        company.job_status = request.GET.get('job_status')
        company.work_location = request.GET.get('work_location')
        company.bio = request.GET.get('bio')
        company.photo = request.GET.get('photo')
        company.resume = request.GET.get('resume')

        company.save()
        return JsonResponse({'result': 'success'})
    except Company.DoesNotExist:
        return JsonResponse({'result': '用户信息未找到'})

