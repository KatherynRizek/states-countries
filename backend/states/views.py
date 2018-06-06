from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from states.models import StateInfo
from countries.models import CountryInfo
from states.serializers import StateInfoSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView
import logging

class StateInfoList(APIView):
    """
    Lists all entered states for a specific country, or create a new state
    """
    def get(self, request, countryCode, format=None):
        states = StateInfo.objects.filter(countryID__code=countryCode)
        serializer = StateInfoSerializer(states, many=True)
        return Response(serializer.data)

    def post(self, request, countryCode, format=None):
        request.data["countryID"] = CountryInfo.objects.get(code=countryCode).id
        serializer = StateInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class StateInfoDetail(APIView):
    """
    Retrieve, update or delete a state instance.
    """
    def get_object(self, pk, countryCode):
        try:
            return StateInfo.objects.get(pk=pk)
        except StateInfo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        state = self.get_object(pk)
        serializer = StateInfoSerializer(state)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        state = self.get_object(pk)
        serializer = StateInfoSerializer(state, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        state = self.get_object(pk)
        state.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class StateInfoListAll(APIView):
    """
    List all states, or create a new state.
    """
    def get(self, request, format=None):
        states = StateInfo.objects.all()
        serializer = StateInfoSerializer(states, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = StateInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
