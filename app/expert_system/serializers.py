from rest_framework import serializers


class SymptomSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
    flag = serializers.BooleanField(default=False, initial=False)


class DiseaseSerializer(serializers.Serializer):
    title = serializers.CharField(required=True, max_length=100)
