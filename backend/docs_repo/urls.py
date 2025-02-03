from django.urls import path
from .views import analyze_stock

urlpatterns = [
    path('analyze/', analyze_stock, name='analyze_stock'),
]