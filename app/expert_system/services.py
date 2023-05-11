import openpyxl

from expert_system.models import Symptom
from expert_system.models import Disease
from expert_system.models import Relation
from expert_system.serializers import SymptomSerializer
from expert_system.serializers import DiseaseSerializer


def get_symptom():
    symptoms = Symptom.objects.all()
    result = dict()
    for symptom in symptoms:
        result[symptom.code] = SymptomSerializer(symptom).data
    return result


def get_disease():
    disease = Disease.objects.all()
    return DiseaseSerializer(disease, many=True).data


def definitions_disease(symptoms):
    diseases = Disease.objects.all()
    weights = {}
    for disease in diseases:
        relations = Relation.objects.filter(disease=disease)
        weight = 0
        for r in relations:
            symptom = symptoms.get(r.symptom.code)
            if symptom['flag']:
                weight += r.weight
        weights[f'{disease.uuid}'] = weight
    found_disease = Disease.objects.get(
        uuid=max(weights, key=weights.get),
    )
    return DiseaseSerializer(found_disease).data


def import_():
    wb = openpyxl.load_workbook('./knowledge_base.xlsx')
    sheet = wb.active
    # Создание болезней
    diseases = sheet['C1':'R10'][0]
    diseases_temp = dict()
    for disease in diseases:
        disease_obj, create = Disease.objects.get_or_create(
            title=disease.value,
        )
        diseases_temp[disease.coordinate] = disease_obj
    # Создание сиптомов
    symptoms = sheet['A2':'B15']
    symptoms_temp = dict()
    for symptom in symptoms:
        symptom_obj, create = Symptom.objects.get_or_create(
            title=symptom[0].value,
            code=symptom[1].value,
        )
        symptoms_temp[symptom[1].coordinate] = symptom_obj
    # Создание весов
    relations_table = sheet['C2':'R15']
    for relations in relations_table:
        for r in relations:
            Relation.objects.get_or_create(
                disease=diseases_temp.get(f'{r.column_letter}1'),
                symptom=symptoms_temp.get(f'B{r.row}'),
                weight=r.value if r.value else 0,
            )
