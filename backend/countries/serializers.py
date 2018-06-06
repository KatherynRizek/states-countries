from rest_framework import serializers
from countries.models import CountryInfo

class CountryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CountryInfo
        fields = ('id', 'code', 'name')