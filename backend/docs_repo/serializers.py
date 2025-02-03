from rest_framework import serializers
from .models import StockReport

class StockReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockReport
        fields = '__all__'