from rest_framework import serializers


class DiseaseSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    description = serializers.CharField(max_length=500)
    is_female = serializers.BooleanField()
    is_male = serializers.BooleanField()
    age_from = serializers.IntegerField()
    age_to = serializers.IntegerField()
    treatment = serializers.CharField(max_length=500)
    prophylaxis = serializers.CharField(max_length=500)


class SymptomSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    flag = serializers.BooleanField(default=False, initial=False)
    description = serializers.CharField(max_length=500)
