from django.urls import path, re_path

from expert_system.base import HybridRouter
from expert_system.views import import_
from expert_system.views import SymptomView
from expert_system.views import DiseaseView

urlpatterns = [
    path('import', import_, name='import'),
]

router = HybridRouter()

router.add_api_view(
    r'symptom',
    re_path(r'symptom/',
            SymptomView.as_view(),
            name='symptom'),
)
router.add_api_view(
    r'disease',
    re_path(
        r'disease/',
        DiseaseView.as_view(),
        name='disease'),
)
