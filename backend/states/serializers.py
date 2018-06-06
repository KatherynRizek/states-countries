from rest_framework import serializers
from states.models import StateInfo

class StateInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = StateInfo
        fields = ('id', 'code', 'name', 'countryID')