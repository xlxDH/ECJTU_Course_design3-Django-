from django.shortcuts import render
from django.http import JsonResponse
from jobseeker.models.forms.form import Form

def update_form(request):
    form_id = request.GET.get('id')
    is_jobseeker_approved = request.GET.get('is_jobseeker_approved')
    try:
        form = Form.objects.get(id=form_id)
        form.is_jobseeker_approved = (is_jobseeker_approved == 'true')
        form.save()
        return JsonResponse({'message': 'Application updated successfully'})
    except Form.DoesNotExist:
        return JsonResponse({'error': form_id})
