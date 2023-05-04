from django.urls import path

from expert_system.views import test

urlpatterns = [
    path('', test, name='test')
]
