from rest_framework import serializers


class DiseaseSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=500)
    description = serializers.CharField(max_length=2000)
    is_female = serializers.BooleanField()
    is_male = serializers.BooleanField()
    age_from = serializers.CharField(max_length=100)
    age_to = serializers.CharField(max_length=100)
    treatment = serializers.CharField(max_length=2000)
    prophylaxis = serializers.CharField(max_length=2000)


class SymptomSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=500)
    flag = serializers.BooleanField(default=False, initial=False)
    description = serializers.CharField(max_length=2000)
