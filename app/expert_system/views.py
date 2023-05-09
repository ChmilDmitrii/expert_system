from typing import Dict
from django.shortcuts import render
from django.http import JsonResponse

from expert_system.models import Disease, Symptom, Relation


def test(request):
    request_symptom: Dict[str, bool] = {
        'F01': True,
        'F03': True,
        'F04': True,
        'F06': True,
        'F07': True,
        'F10': True,
        'F11': True,
        'F14': True,
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
        weights[f'{d.uuid}'] = weight

    return JsonResponse({'weight': weights})


def import_(request):
    import openpyxl
    wb = openpyxl.load_workbook('./knowledge_base.xlsx')
    sheet = wb.active

    # Создание болезней
    diseases = sheet['B1':'Q10'][0]
    diseases_temp = dict()
    for disease in diseases:
        disease_obj, create = Disease.objects.get_or_create(
            title=disease.value,
        )
        diseases_temp[disease.coordinate] = disease_obj

    # Создание сиптомов
    symptoms = sheet['A2':'A15']
    symptoms_temp = dict()
    for symptom in symptoms:
        symptom_obj, create = Symptom.objects.get_or_create(
            title=symptom[0].value,
        )
        symptoms_temp[symptom[0].coordinate] = symptom_obj

    # Создание весов
    relations_table = sheet['B2':'Q15']
    for relations in relations_table:
        for r in relations:
            Relation.objects.get_or_create(
                disease=diseases_temp.get(f'{r.column_letter}1'),
                symptom=symptoms_temp.get(f'A{r.row}'),
                weight=r.value if r.value else 0,
            )

    return JsonResponse({})
