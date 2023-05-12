import uuid

from django.db import models


class Disease(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    title = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=500, null=True, blank=True)
    is_female = models.BooleanField(null=True, blank=True)
    is_male = models.BooleanField(null=True, blank=True)
    age_from = models.PositiveIntegerField(null=True, blank=True)
    age_to = models.PositiveIntegerField(null=True, blank=True)
    treatment = models.CharField(max_length=500, null=True, blank=True)
    prophylaxis = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title


class Symptom(models.Model):
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    title = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=100, unique=True)
    flag = models.BooleanField(default=False)
    description = models.CharField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.title


class Relation(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    weight = models.IntegerField()
