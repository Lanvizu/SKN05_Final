from django.db import models

class StockReport(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    summary = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ticker