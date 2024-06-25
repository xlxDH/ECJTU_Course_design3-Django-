from django.http import JsonResponse
from jobseeker.models.companys.company import Company

def get_company_name(request):
    company_id = request.GET.get('company_id')
    company = Company.objects.get(id=company_id)
    return JsonResponse({'result':'success','company_name': company.user.name})
