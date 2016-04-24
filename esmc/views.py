from django.shortcuts import render
from .forms import DriverTaskForm
from .models import DriverTask
# Create your views here.

def index(request):

    return render(request,"index.html")

def admin_edit(request):
    context = {
        'form' : DriverTaskForm()
    }
    return render(request, 'index.html', context)

