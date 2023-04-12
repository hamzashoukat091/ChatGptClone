from django.shortcuts import render
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
import openai
import os
from dotenv import load_dotenv

load_dotenv()


def index(request):
    return render(request, 'index.html')


def check(request):
    openai.api_key = os.environ['API_KEY']
    # Define the GPT-3 model to use
    model = "text-davinci-003"

    if request.method == 'POST':
        message = request.POST.get('message')
        pdf = request.FILES.get('pdf', None)
        # Generate the text
        response = openai.Completion.create(
            engine=model,
            prompt=message,
            temperature=0.9,
            max_tokens=150,
            top_p=1,
            frequency_penalty=0.0,
            presence_penalty=0.6,
            stop=[" Human:", " AI:"]
        )
        if pdf:
            print('PDF file uploaded:', pdf.name)
            response_data = {"message": response["choices"][0]['text'],
                             "PDF": pdf.name, }
        else:
            print('No PDF file uploaded.')
            response_data = {"message": response["choices"][0]['text'],
                             "PDF": "Not Uploaded", }
    return JsonResponse(response_data)


def api(request):
    if request.method == 'POST':
        api_key = request.POST.get('api_key')
        response_data = {"message": "Success!",
                         "API KEY": api_key}
    return JsonResponse(response_data)
