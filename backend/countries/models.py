from django.db import models

class CountryInfo(models.Model):
    code = models.CharField(max_length=2)
    name = models.CharField(max_length=200)
    
