from django.db import models
from countries.models import CountryInfo

class StateInfo(models.Model):
    code = models.CharField(max_length=2)
    name = models.CharField(max_length=200)
    countryID = models.ForeignKey(CountryInfo, on_delete=models.CASCADE)
