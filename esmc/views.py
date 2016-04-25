from django.shortcuts import render
from .forms import DriverTaskForm
from .models import DriverTask
from django.core import serializers
from django.http import HttpResponse
# Create your views here.

def index(request):

    return render(request,"index.html")

def ajax(request):
    data = DriverTask.objects.order_by("dateCreated").all()
    return HttpResponse(serializers.serialize("json", data, use_natural_foreign_keys=True), content_type="application/json", charset = "UTF-8")

def admin_edit(request):
    context = {
        'form' : DriverTaskForm()
    }
    return render(request, 'index.html', context)

