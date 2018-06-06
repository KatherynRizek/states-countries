from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from countries.models import CountryInfo
from countries.serializers import CountryInfoSerializer
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import Http404
from rest_framework.views import APIView

class CountryInfoList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    def get(self, request, format=None):
        countries = CountryInfo.objects.all()
        serializer = CountryInfoSerializer(countries, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        serializer = CountryInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CountryInfoDetail(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """
    def get_object(self, pk):
        try:
            return CountryInfo.objects.get(pk=pk)
        except CountryInfo.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        country = self.get_object(pk)
        serializer = CountryInfoSerializer(country)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        country = self.get_object(pk)
        serializer = CountryInfoSerializer(country, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        country = self.get_object(pk)
        country.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)



# @api_view(['GET', 'POST'])
# def country_list(request, format=None):
#     """
#     List all code countries, or create a new country.
#     """
#     if request.method == 'GET':
#         countries = CountryInfo.objects.all()
#         serializer = CountryInfoSerializer(countries, many=True)
#         return Response(serializer.data)

#     elif request.method == 'POST':
#         serializer = CountryInfoSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['GET', 'PUT', 'DELETE'])
# def country_detail(request, pk, format=None):
#     """
#     Retrieve, update or delete a country.
#     """
#     try:
#         country = CountryInfo.objects.get(pk=pk)
#     except CountryInfo.DoesNotExist:
#         return Response(status=status.HTTP_404_NOT_FOUND)

#     if request.method == 'GET':
#         serializer = CountryInfoSerializer(snippet)
#         return Response(serializer.data)

#     elif request.method == 'PUT':
#         serializer = CountryInfoSerializer(country, data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         country.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)






# @csrf_exempt
# def country_list(request):
#     """
#     List all code snippets, or create a new snippet.
#     """
#     if request.method == 'GET':
#         countries = CountryInfo.objects.all()
#         serializer = CountryInfoSerializer(countries, many=True)
#         return JsonResponse(serializer.data, safe=False)

#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         serializer = CountryInfoSerializer(data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data, status=201)
#         return JsonResponse(serializer.errors, status=400)

# @csrf_exempt
# def country_detail(request, pk):
#     """
#     Retrieve, update or delete a code snippet.
#     """
#     try:
#         country = CountryInfo.objects.get(pk=pk)
#     except CountryInfo.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         serializer = CountryInfoSerializer(country)
#         return JsonResponse(serializer.data)

#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         serializer = CountryInfoSerializer(country, data=data)
#         if serializer.is_valid():
#             serializer.save()
#             return JsonResponse(serializer.data)
#         return JsonResponse(serializer.errors, status=400)

#     elif request.method == 'DELETE':
#         snippet.delete()
#         return HttpResponse(status=204)