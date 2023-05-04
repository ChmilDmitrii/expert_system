from django.contrib import admin

from expert_system.models import Disease, Symptom, Relation


class RelationAdmin(admin.ModelAdmin):
    list_display = ("disease", "symptom", "weight")


admin.site.register(Disease)
admin.site.register(Symptom)
admin.site.register(Relation, RelationAdmin)
