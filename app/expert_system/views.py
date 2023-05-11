from rest_framework.views import APIView
from rest_framework.response import Response

from expert_system.services import get_symptom
from expert_system.services import get_disease
from expert_system.services import definitions_disease
from expert_system.services import import_


class SymptomView(APIView):
    @staticmethod
    def get(request):
        return Response(get_symptom())


class DiseaseView(APIView):
    @staticmethod
    def get(request):
        return Response(get_disease())

    @staticmethod
    def post(request):
        return Response(definitions_disease(request.data))


def import_data(request):
    import_()
    return Response({})
