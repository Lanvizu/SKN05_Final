from django.contrib import admin
from .models import StockFundamental

@admin.register(StockFundamental)
class StockFundamentalAdmin(admin.ModelAdmin):
    list_display = ('ticker', 'per', 'pbr', 'eps', 'bps', 'roe', 'div', 'dps', 'created_at')
    search_fields = ('ticker',)