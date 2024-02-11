from django.http import HttpResponse
from django.shortcuts import render

def login(request,Krack):
	return render(request,"Krack.html")

def aboutUs(request):
	return HttpResponse("This is the about section.")
