from django.db import models
    
class StockData(models.Model):
    ticker = models.CharField(max_length=10)
    date = models.DateField()
    open_price = models.FloatField(default=0)
    close_price = models.FloatField(default=0)
    volume = models.BigIntegerField(default=0)

    class Meta:
        unique_together = ('ticker', 'date')

    def compute_change(self):
        if self.open_price == 0:
            return "N/A"
        change_value = self.close_price - self.open_price
        change_percent = (change_value / self.open_price) * 100
        return f"{round(change_value, 1)} ({round(change_percent, 1)}%)"

class IndexData(models.Model):
    ticker = models.CharField(max_length=10)
    date = models.DateField()
    open_value = models.FloatField(default=0)
    close_value = models.FloatField(default=0)

    class Meta:
        unique_together = ('ticker', 'date')

    def compute_change(self):
        if self.open_value == 0:
            return "N/A"
        change_value = self.close_value - self.open_value
        change_percent = (change_value / self.open_value) * 100
        return f"{round(change_value, 1)} ({round(change_percent, 1)}%)"

class SP500Ticker(models.Model):
    ticker = models.CharField(max_length=10, unique=True, verbose_name="티커")
    name = models.CharField(max_length=200, verbose_name="회사명")
    sector = models.CharField(max_length=100, blank=True, null=True, verbose_name="섹터")

    def __str__(self):
        return self.ticker