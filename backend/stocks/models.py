from django.db import models

class Stock(models.Model):
    ticker = models.CharField(max_length=10)
    close_price = models.FloatField()
    change = models.CharField(max_length=50)
    volume = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.ticker} - {self.date.strftime('%Y-%m-%d %H:%M:%S')}"
    
class Index(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100)
    value = models.FloatField()
    change = models.CharField(max_length=50)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name