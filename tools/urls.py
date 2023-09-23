from django.urls import path
from tools import views

urlpatterns = [
    path('', views.index, name='home'),
    path('health-check', views.health_check, name='health_check'),
]