from django.urls import path
from . import views

urlpatterns = [
    path('indices/', views.IndicesView.as_view(), name='indices-view'),
    path('', views.StockView.as_view(), name='stock-view'),
    path('sp500/', views.SP500TickerListView.as_view(), name='sp500-list'),
]