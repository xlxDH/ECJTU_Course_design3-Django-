from django.http import JsonResponse
from jobseeker.models.jobseekers.jobseekers import Jobseeker

def get_jobseeker_name(request):
    jobseeker_id = request.GET.get('jobseeker_id')
    jobseeker = Jobseeker.objects.get(id=jobseeker_id)
    return JsonResponse({'result':'success','jobseeker_name': jobseeker.user.name})
