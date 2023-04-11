from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse

# Create your views here.


def index(request):
    return render(request, 'index.html')


def check(request):
    if request.method == 'POST':
        message = request.POST.get('message')
        pdf = request.FILES.get('pdf', None)
        message = message[::-1]
        if pdf:
            print('PDF file uploaded:', pdf.name)
            response_data = {"message": message,
                             "PDF": pdf.name, }
        else:
            print('No PDF file uploaded.')
            response_data = {"message": message,
                             "PDF": "Not Uploaded", }
    return JsonResponse(response_data)


def api(request):
    if request.method == 'POST':
        api_key = request.POST.get('api_key')
        response_data = {"message": "Success!",
                         "API KEY": api_key}
    return JsonResponse(response_data)
