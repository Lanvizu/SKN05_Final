from rest_framework import serializers
from .models import SP500Ticker
from .models import StockData, IndexData

class StockDataSerializer(serializers.ModelSerializer):
    change = serializers.SerializerMethodField()
    name = serializers.CharField(source='ticker')
    price = serializers.FloatField(source='close_price')

    class Meta:
        model = StockData
        fields = ['ticker', 'name', 'price', 'volume', 'change']

    def get_change(self, obj):
        return obj.compute_change()

class IndexDataSerializer(serializers.ModelSerializer):
    change = serializers.SerializerMethodField()
    name = serializers.CharField(source='ticker')
    value = serializers.FloatField(source='close_value')

    class Meta:
        model = IndexData
        fields = ['ticker', 'name', 'value', 'change']

    def get_change(self, obj):
        return obj.compute_change()

class SP500TickerSerializer(serializers.ModelSerializer):
    class Meta:
        model = SP500Ticker
        fields = ['ticker', 'name', 'sector']
