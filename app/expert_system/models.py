from django.db import models


class Disease(models.Model):
    uuid = models.CharField(unique=True, max_length=100)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Symptom(models.Model):
    uuid = models.CharField(unique=True, max_length=100)
    title = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Relation(models.Model):
    disease = models.ForeignKey(Disease, on_delete=models.CASCADE)
    symptom = models.ForeignKey(Symptom, on_delete=models.CASCADE)
    weight = models.IntegerField()
