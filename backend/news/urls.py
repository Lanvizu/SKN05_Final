from django.urls import path
from . import views

urlpatterns = [
    path('', views.TodayNewsView.as_view(), name='today-news'),
]