from django.conf.urls import url
from django.urls import path
from django.contrib import admin

from . import views
from .views import *

urlpatterns = [
    # ... the rest of the urlpatterns ...
    # must be catch-all for pushState to work
    path('outcomes/', views.OutcomeList.as_view(), name="outcomes"),
    path('communities/', views.CommunitiesList.as_view(), name="communities"),
    path('DVHRTHighRiskVictimInfo/', views.DVHRTHighRiskVictimInfo.as_view(), name="DVHRTHighRiskVictimInfo"),
    path('DVHRTHighRiskAbuserInfo/', views.DVHRTHighRiskAbuserInfo.as_view(), name="DVHRTHighRiskAbuserInfo"),
    path('DVHRTRiskFactorCounts/', views.DVHRTRiskFactorCounts.as_view(), name="DVHRTRiskFactorCounts"),
    path('DVHRTCriminalJusticeOutcomes/', views.DVHRTCriminalJusticeOutcomes.as_view(), name="DVHRTCriminalJusticeOutcomes"),
]

