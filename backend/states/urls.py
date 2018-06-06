from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from states import views
#from countries import CountryInfo

urlpatterns = [
    url(r'^$', views.StateInfoListAll.as_view()),
    url(r'^(?P<countryCode>[A-z]+)/states/$', views.StateInfoList.as_view()),
    url(r'^(?P<countryCode>[A-z]+)/states/(?P<pk>[0-9]+)/$', views.StateInfoDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)



# urlpatterns = [
#     url(r'^countries/$', views.CountryInfoList.as_view()),
#     url(r'^countries/(?P<pk>[0-9]+)/$', views.CountryInfoDetail.as_view()),
# ]