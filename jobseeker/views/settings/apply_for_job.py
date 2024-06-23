from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jobseeker.models.companys.company import Company
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.forms.form import Form

def apply_for_job(request):
    data = request.GET
    jobseeker_id = data.get('jobseeker_id',"").strip()
    company_id = data.get('company_id',"").strip()
    job_position = data.get('job_position',"").strip()
    salary = data.get('salary',"").strip()
    location = data.get('location',"").strip()

    jobseeker = Jobseeker(id=jobseeker_id)
    company = Company(id=company_id)

    Form.objects.create(jobseeker=jobseeker,company=company,job_position=job_position,salary=salary,location=location,is_jobseeker_approved=True,is_company_approved=False)
    #return JsonResponse({'result':123})
    return JsonResponse({'status': 'success', 'message': 'Application submitted successfully'})
