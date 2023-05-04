from typing import Dict
from django.shortcuts import render
from django.http import JsonResponse

from expert_system.models import Disease, Symptom, Relation


def test(request):
    request_symptom: Dict[str, bool] = {
        'потеря аппетита': True,
        # 'потеря жвачки': True,
    }

    disease = Disease.objects.all()

    weights = {}

    for d in disease:
        relations = Relation.objects.filter(disease=d)
        weight = 0
        for r in relations:
            symptom = request_symptom.get(r.symptom.title)
            if symptom:
                weight += r.weight
        weights[d.uuid] = weight

    return JsonResponse({'weight': weights})
