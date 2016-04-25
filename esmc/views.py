from django.shortcuts import render
from .forms import DriverTaskForm
from .models import DriverTask,DriverTaskStatus
from django.core import serializers
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
# Create your views here.

def index(request):

    return render(request,"index.html")

def ajax(request):
    data = DriverTask.objects.order_by("dateCreated").filter(status = ).all()
    return HttpResponse(serializers.serialize("json", data, use_natural_foreign_keys=True), content_type="application/json", charset = "UTF-8")

@csrf_exempt
def set_status(request):
    if request.method == "POST":
        item = request.POST["id"]
        status=request.POST["status"]
        task = DriverTask.objects.get(id=item)
        task_status = DriverTaskStatus.objects.get(name=status)
        task.status = task_status
        task.save()
        return HttpResponse("200 OK")
    else:
        return HttpResponse("404 Bitch")

def admin_edit(request):
    context = {
        'form' : DriverTaskForm()
    }
    return render(request, 'index.html', context)

