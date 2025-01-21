from django.urls import path
from . import views

urlpatterns = [
    path('indices/', views.indices_api_view, name='indices_api_view'),
    path('stocks/', views.stock_api_view, name='stock_api_view'),
]