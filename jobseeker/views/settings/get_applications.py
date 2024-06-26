from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.companys.company import Company
from jobseeker.models.forms.form import Form

def get_form(request, jobseeker_id):
    forms = Form.objects.filter(jobseeker_id=jobseeker_id)
    form_list = []

    for form in forms:
        jobseeker = Jobseeker.objects.get(id=form.jobseeker_id)
        company = Company.objects.get(id=form.company_id)
        form_data = {
            'id' : form.id,
            'jobseeker_name': jobseeker.user.username,
            'company_name': company.user.username,
            'job_position': form.job_position,
            'salary': form.salary,
            'location': form.location,
            'is_jobseeker_approved': form.is_jobseeker_approved,
            'is_company_approved': form.is_company_approved
        }
        form_list.append(form_data)
    return JsonResponse(form_list,safe=False)
