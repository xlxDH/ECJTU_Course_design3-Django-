from django.shortcuts import render
from django.http import JsonResponse
from jobseeker.models.companys.company import Company
from django.contrib.auth.models import User

def get_companys(request):
    companies = Company.objects.all()
    company_list = []

    for company in companies:
        user = company.user
        company_date = {
            'username': user.username,
            'photo': company.photo,
            'phone': company.phone,
            'bio': company.bio,
            'expected_salary': company.expected_salary,
            'desired_job': company.desired_job,
            'work_location': company.work_location
        }
        company_list.append(company_date)

    return JsonResponse(company_list, safe=False)
