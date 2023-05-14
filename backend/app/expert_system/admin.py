from django.contrib import admin

from expert_system.models import Disease, Symptom, Relation


class DiseaseAdmin(admin.ModelAdmin):
    search_fields = ["uuid", "title", "description", "age_from",
                     "age_to", "treatment", "prophylaxis"]

    list_display = ["title"]


class SymptomAdmin(admin.ModelAdmin):
    search_fields = ["uuid", "title", "code", "description"]

    list_display = ["title", "code"]


class RelationAdmin(admin.ModelAdmin):
    search_fields = ["disease__title", "symptom__title", "weight"]

    list_display = ["disease", "symptom", "weight"]

    list_filter = ["disease", "symptom"]


admin.site.register(Disease, DiseaseAdmin)
admin.site.register(Symptom, SymptomAdmin)
admin.site.register(Relation, RelationAdmin)
