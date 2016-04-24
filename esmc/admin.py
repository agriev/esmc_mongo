from django.contrib import admin

# Register your models here.
admin.autodiscover()
from .models import Route, TechOp,DriverTask,DriverTaskStatus,Worker
admin.site.register((Route,TechOp,DriverTaskStatus,DriverTask,Worker))