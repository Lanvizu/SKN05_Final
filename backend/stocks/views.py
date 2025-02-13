from django.shortcuts import render
from rest_framework.response import Response
import yfinance as yf
from rest_framework import generics
from django.db.models import Q
from .models import SP500Ticker, StockData, IndexData
from .serializers import SP500TickerSerializer, StockDataSerializer, IndexDataSerializer
from config.authentication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from django.utils import timezone

def fetch_real_time_data(ticker):
    try:
        data = yf.Ticker(ticker).history(period="1d", interval="1m")
        if data.empty:
            return None, None, None
        latest_date = data.index[-1]
        latest_data = data.iloc[-1]
        return latest_date, latest_data, data
    except Exception as e:
        return None, None, None

class StockView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        tickers = user.interest_tickers
        today = timezone.now().date()
        stocks_data = []

        for ticker in tickers:
            stock_instance = StockData.objects.filter(ticker=ticker, date=today).first()
            if not stock_instance:
                try:
                    stock = yf.Ticker(ticker)
                    hist = stock.history(period="1d")
                    if not hist.empty:
                        latest = hist.iloc[-1]
                        open_price = round(float(latest.get('Open', 0)), 2)
                        close_price = round(float(latest.get('Close', 0)), 2)
                        volume = int(latest.get('Volume', 0))
                        stock_instance = StockData.objects.create(
                            ticker=ticker,
                            date=today,
                            open_price=open_price,
                            close_price=close_price,
                            volume=volume
                        )
                except Exception as e:
                    print(f"Error fetching data for {ticker}: {e}")
                    continue

            if stock_instance:
                stocks_data.append(stock_instance)

        serializer = StockDataSerializer(stocks_data, many=True)
        return Response(serializer.data)

class IndicesView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickers = ['^VIX', 'GC=F', '^DJI', '^IXIC', '^GSPC', '^RUT']
        today = timezone.now().date()
        index_data = []

        for ticker in tickers:
            index_instance = IndexData.objects.filter(ticker=ticker, date=today).first()
            if not index_instance:
                try:
                    stock = yf.Ticker(ticker)
                    hist = stock.history(period="1d")
                    if not hist.empty:
                        latest = hist.iloc[-1]
                        open_value = round(float(latest.get('Open', 0)), 2)
                        close_value = round(float(latest.get('Close', 0)), 2)
                        index_instance = IndexData.objects.create(
                            ticker=ticker,
                            date=today,
                            open_value=open_value,
                            close_value=close_value
                        )
                except Exception as e:
                    print(f"Error fetching data for {ticker}: {e}")
                    continue

            if index_instance:
                index_data.append(index_instance)

        serializer = IndexDataSerializer(index_data, many=True)
        return Response(serializer.data)


class SP500TickerListView(generics.ListAPIView):
    serializer_class = SP500TickerSerializer
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = SP500Ticker.objects.all()
        search_term = self.request.query_params.get('search', '')
        if search_term:
            queryset = queryset.filter(
                Q(ticker__icontains=search_term) | Q(name__icontains=search_term)
            )
        return queryset