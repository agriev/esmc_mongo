from django import forms
from .models import DriverTask

class DriverTaskForm(forms.ModelForm):
    class Meta:
        model = DriverTask
        fields = ('route','techOp','dateStart','dateFinish','comment','status','worker')