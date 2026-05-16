from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

def home_view(request):
    """
    Renders the portfolio home page.
    """
    return render(request, 'index.html')

def contact_view(request):
    """
    Handles contact form submission.
    Currently simulates success and returns a JSON response.
    """
    if request.method == 'POST':
        # Here you would typically process the form and send an email
        # For now, we just simulate success
        return JsonResponse({'status': 'success', 'message': 'Message sent successfully!'})
    return JsonResponse({'status': 'error', 'message': 'Invalid request method.'}, status=400)
