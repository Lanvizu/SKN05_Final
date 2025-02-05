from rest_framework import serializers
from .models import StockReport

class StockReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockReport
        fields = ['ticker', 'summary', 'created_at']