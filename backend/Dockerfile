FROM python:3.13
WORKDIR /backend
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "config.wsgi:application"]
