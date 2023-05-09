from django.urls import path

from expert_system.views import test
from expert_system.views import import_

urlpatterns = [
    path('', test, name='test'),
    path('import', import_, name='import')
]
