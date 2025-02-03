from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import StockFundamental
from .serializers import StockFundamentalSerializer
import yfinance as yf

@api_view(['GET', 'POST'])
def stock_api_view(request):
    tickers = ['IONQ', 'TSLA', 'NVDA']  # 주식 티커 리스트

    if request.method == 'POST':
        stocks_data = []

        for ticker in tickers:
            try:
                # yfinance에서 주식 데이터 가져오기
                stock = yf.Ticker(ticker)
                info = stock.info

                # 주요 재무 데이터 가져오기
                data = {
                    "ticker": ticker,
                    "per": info.get("trailingPE"),
                    "pbr": info.get("priceToBook"),
                    "eps": info.get("trailingEps"),
                    "bps": info.get("bookValue"),
                    "roe": info.get("returnOnEquity"),
                    "div": info.get("dividendRate"),
                    "dps": info.get("dividendYield"),
                }

                # StockFundamental 업데이트 또는 생성
                stock_fundamental, created = StockFundamental.objects.update_or_create(
                    ticker=ticker,
                    defaults=data
                )

                serializer = StockFundamentalSerializer(stock_fundamental)
                stocks_data.append(serializer.data)

            except Exception as e:
                print(f"Error fetching data for {ticker}: {e}")
                continue

        if stocks_data:
            return Response(stocks_data)
        return Response({'error': 'No data available'}, status=404)

    elif request.method == 'GET':
        return Response({
            "message": "Use POST method to update stock data. Example: {\"ticker\": \"TSLA\"}"
        })