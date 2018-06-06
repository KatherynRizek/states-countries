from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from countries import views

urlpatterns = [
    url(r'^$', views.CountryInfoList.as_view()),
    url(r'^(?P<pk>[0-9]+)/$', views.CountryInfoDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)
