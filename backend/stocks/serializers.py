from rest_framework import serializers
from .models import Index

class StockSerializer(serializers.Serializer):
    ticker = serializers.CharField(max_length=10)
    open_price = serializers.FloatField()
    high_price = serializers.FloatField()
    low_price = serializers.FloatField()
    close_price = serializers.FloatField()
    volume = serializers.IntegerField()
    
class IndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = Index
        fields = ['ticker', 'name', 'korean_name', 'value', 'change', 'last_updated']