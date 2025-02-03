from rest_framework import serializers
from .models import StockFundamental  # 변경된 모델명 적용

class StockFundamentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = StockFundamental  # 변경된 모델명 적용
        fields = '__all__'