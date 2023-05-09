from django.contrib import admin

from expert_system.models import Disease, Symptom, Relation


class DiseaseAdmin(admin.ModelAdmin):
    search_fields = ["uuid"]

    list_display = ["uuid", "title"]


class RelationAdmin(admin.ModelAdmin):
    list_display = ["disease", "symptom", "weight"]


admin.site.register(Disease, DiseaseAdmin)
admin.site.register(Symptom)
admin.site.register(Relation, RelationAdmin)
