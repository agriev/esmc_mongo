from django.db import models

# Create your models here.
class Route(models.Model):
    name = models.CharField(max_length = 200)
    odh = models.CharField(max_length = 200)

    def natural_key(self):
        return (self.name, self.odh)

    class Meta:
        unique_together = (('name', 'odh'),)

    def __str__(self):
        return self.name

class TechOp(models.Model):
    name = models.CharField(max_length = 200)

    def natural_key(self):
        return (self.name)

    def __str__(self):
        return self.name

class DriverTaskStatus(models.Model):
    name = models.CharField(max_length = 200)

    def natural_key(self):
        return (self.name)
    def __str__(self):
        return self.name

class Worker(models.Model):
    name = models.CharField(max_length = 200)
    def natural_key(self):
        return (self.name)
    def __str__(self):
        return self.name

class DriverTask(models.Model):
    #route_string = models.CharField()
    route = models.ForeignKey(to=Route)
    techOp = models.ForeignKey(to=TechOp)
    dateStart = models.DateTimeField()
    dateFinish = models.DateTimeField()
    dateCreated = models.DateTimeField(auto_now = True, blank = True)
    comment = models.CharField(max_length = 200)
    status = models.ForeignKey(to=DriverTaskStatus)
    worker = models.ForeignKey(to=Worker)
    def __str__(self):
        return self.comment



