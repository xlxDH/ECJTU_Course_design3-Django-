from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from jobseeker.models.companys.company import Company

def get_company_details(request,company_id):
    company = get_object_or_404(Company, id=company_id)
    company_data = {
        'id': company.id,
        'username': company.user.username,
        'phone': company.phone,
        'desired_job': company.desired_job,
        'expected_salary': company.expected_salary,
        'work_location': company.work_location,
        'bio': company.bio
    }
    return JsonResponse(company_data)
