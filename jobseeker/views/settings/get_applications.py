from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from jobseeker.models.jobseekers.jobseekers import Jobseeker
from jobseeker.models.forms.form import Form

def get_form(request, jobseeker_id):
    forms = Form.objects.filter(jobseeker_id=jobseeker_id)
    form_list = list(forms.values())
    return JsonResponse(form_list,safe=False)
