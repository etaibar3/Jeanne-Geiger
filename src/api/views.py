import logging

from django.views.generic import View
from django.http import HttpResponse
from django.http import JsonResponse
from django.conf import settings
from django.core import serializers
from django.shortcuts import render

from rest_framework import generics
from rest_framework.views import Response

from api.serializers import *
from .models import *

from itertools import chain
from operator import attrgetter

class FrontendAppView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `yarn
    run build`).
    """

    def get(self, request):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `yarn run build` to test the production version.
                """,
                status=501,
            )

class AbuserEthnicities(generics.ListCreateAPIView):
    def get(self, request, *args, **kwargs):
        c_id = request.GET.get("community_id")
        case_set = Cases.objects.filter(community_id=c_id).select_related('abuser_id')
        people_set = Persons.objects.filter(is_victim=False)
        #abuser_list = chain(case_set, people_set).groupby(attrgetter('abuser_id'))
        ethnicities_to_counts = {
            0: 0,
            1: 0,
            2: 0,
            3: 0,
            4: 0,
            5: 0,
            6: 0,
            7: 0,
        }
        total_count = 0
        for case in case_set:
            abuser = case.abuser_id
            for ethnicity in abuser.race_ethnicity:
                try:
                    ethnicities_to_counts[ethnicity] += 1
                except:
                    ethnicities_to_counts[ethnicity] = 1
                total_count += 1

        counts = {
            'American Indian/Alaska Native': ethnicities_to_counts[1],
            'Asian': ethnicities_to_counts[2],
            'Black/African American': ethnicities_to_counts[3],
            'Hispanic or Latino': ethnicities_to_counts[4],
            'Native Hawaiian/Pacific Islander': ethnicities_to_counts[5],
            'White': ethnicities_to_counts[6],
            'Other/Unknown': ethnicities_to_counts[0] + ethnicities_to_counts[7],
            "Total Count" : total_count
        }

        return JsonResponse(counts)

# # View 8: Risk Factors
# # Show the count associated with each risk factor below
# # Has he/she tried to kill you?
# # Has he/she ever tried to choke (strangle) you?
# # Has he/she choked (strangled) you multiple times?
# # Does he/she own a gun?

# class risk_factors(generics.ListCreateAPIView):
#     def get(self, request, *args, **kwargs):
#         community_id = request.community_id
#         queryset = Case.objects.all()
#         case_set = queryset.filter(community_id = community_id)
#         risks = Risk_Factors.objects.all()
#         tallies = [0] * 4
#         for case in case_set:
#             risk_factors = risks[case['risk_factor_id']]
#             if(risk_factors['attempted_murder']):
#                 tallies[0] += 1
#             if(risk_factors['attempted_choke']):
#                 tallies[1] += 1
#             if(risk_factors['multiple_choked']):
#                 tallies[2] += 1
#             if(risk_factors['owns_gun']):
#                 tallies[3] += 1

#         risk_counts = {
#             'attempted_murder': tallies[0],
#             'attempted_choke': tallies[1],
#             'multiple_choked': tallies[2],
#             'owns_gun': tallies[3],
#         }
#         return HttpResponse(risk_counts)

# class pretrial_outcome(generics.ListCreateAPIView):
#     def get(self, request, *args, **kwargs):
#         outcome_id = request.outcome_id
#         queryset = Case.objects.all()
#         case_set = queryset.filter(community_id = community_id)
#         outcomes = Outcomes.objects.all()
#         tallies = [0] * 7
#         for case in case_set:
#             outcome = outcomes[case['outcome_id']]
#             tallies[outcome['pretrial_outcome'] += 1
#         risk_counts = {
#             'undefined': tallies[0],            
#             'Released on Bail': tallies[1],
#             'Released on Personal Recognizance': tallies[2],
#             'Detained/Pretrial Detention Statute': tallies[3],
#             'Detained/Bail Unmet': tallies[4],
#             'Detained/Other': tallies[5],
#             'Pending Pretrial Hearing': tallies[6],
#         }
#         return HttpResponse(outcome_counts)

# class sentencing_outcomes_sentence(generics.ListCreateAPIView):
#     def get(self, request, *args, **kwargs):
#         outcome_id = request.outcome_id
#         queryset = Case.objects.all()
#         case_set = queryset.filter(community_id = community_id)
#         outcomes = Outcomes.objects.all()
#         tallies = [0] * 3
#         for case in case_set:
#             outcome = outcomes[case['outcome_id']]
#             tallies[outcome['sentencing_outcomes_sentence'] += 1
#         outcome_counts = {
#             'undefined': tallies[0],            
#             'Incarceration': tallies[1],
#             'Probation': tallies[2],
#             'Incarceration Followed by Probation': tallies[2],
#         }
#         return HttpResponse(outcome_counts)