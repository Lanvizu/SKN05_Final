FROM python:3.13
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "--config", "./web/gunicorn_config.py", "config.wsgi:application"]
