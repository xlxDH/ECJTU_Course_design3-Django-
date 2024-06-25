from django.shortcuts import render
from django.http import JsonResponse
from jobseeker.models.forms.form import Form

def hr_update_form(request):
    form_id = request.GET.get('id')
    is_company_approved = request.GET.get('is_company_approved')
    try:
        form = Form.objects.get(id=form_id)
        form.is_company_approved = (is_company_approved == 'true')
        form.save()
        return JsonResponse({'message': 'Application updated successfully'})
    except Form.DoesNotExist:
        return JsonResponse({'error': form_id})
