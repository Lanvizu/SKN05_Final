from django.db import models

class StockFundamental(models.Model):
    ticker = models.CharField(max_length=10, unique=True)
    per = models.FloatField(null=True, blank=True)  # 주가수익비율
    pbr = models.FloatField(null=True, blank=True)  # 주가순자산비율
    eps = models.FloatField(null=True, blank=True)  # 주당순이익
    bps = models.FloatField(null=True, blank=True)  # 주당순자산
    roe = models.FloatField(null=True, blank=True)  # 자기자본이익률
    div = models.FloatField(null=True, blank=True)  # 배당금
    dps = models.FloatField(null=True, blank=True)  # 배당률
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.ticker