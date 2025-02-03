from django.urls import path
from .views import stock_api_view

urlpatterns = [
    path('stock-api/', stock_api_view, name='stock-api'),
]