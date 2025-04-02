from django.db import models
from django.contrib.auth.models import User


#========================projects Model  ================================
class Project(models.Model):
    title = models.CharField(max_length=255)
    details = models.TextField()
    total_target = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    #realation one to meny 
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title
