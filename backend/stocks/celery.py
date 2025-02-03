from celery import Celery
from celery.schedules import crontab
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'daily_index.settings')

app = Celery('daily_index')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()

