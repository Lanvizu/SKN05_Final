# backend/stocks/tasks.py
from celery import shared_task
from .views import update_indices

@shared_task
def update_indices_task():
    update_indices()