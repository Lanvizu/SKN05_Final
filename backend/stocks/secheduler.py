# scheduler.py
from apscheduler.schedulers.background import BackgroundScheduler
from stocks.views import update_indices

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_indices_task, 'interval', days=1)  # 하루에 한 번 실행
    scheduler.start()

def update_indices_task():
    # update_indices 함수 호출
    update_indices(None)