from django.shortcuts import render, HttpResponse
from django.http import JsonResponse

# Create your views here.
def index (request):
    return render(request, 'index.html')

def health_check(request):
    return JsonResponse(data=200, status=200, safe=False)