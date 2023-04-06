from django.db import models
from django.db.models import Q
from django.conf import settings 



STATUS = (
    (0,"uncompleted"),
    (1,"completed")
)

class ProjectManager(models.Manager):
    
    def get_all_projects(self, me):
        profiles = Project.objects.all().exclude(user=me)
        return profiles


# Create your models here.
class Project(models.Model):
    # to be added 
    # vendor = models.ForeignKey(Profile, on_delete=models.PROTECT, related_name='vendor')
   # client = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='client')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='project_user')
    name = models.CharField(max_length=200)
    description = models.TextField(max_length=1000)
    duration = models.DurationField()
    startdate = models.DateField()
    completiondate = models.DateField()
    cost = models.DecimalField(max_digits=20, decimal_places=2)
    status = models.IntegerField(choices=STATUS, default=0)
    updated = models.DateTimeField(auto_now=True)
    # name = models.CharField(max_length=200)
    # description = models.CharField(max_length=200)
    # duration = models.CharField(max_length=200)
    # startdate = models.CharField(max_length=200)
    # completiondate = models.CharField(max_length=200)
    # cost = models.CharField(max_length=200)
    # status = models.CharField(max_length=200)
    # updated = models.CharField(max_length=200)

    objects = ProjectManager()

    def get_projects(self):
        return self.friends.all()

    def get_no_projects(self):
        return self.friends.all().count()

    def __str__(self):
        return str(self.name)