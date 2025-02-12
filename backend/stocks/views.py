from django.shortcuts import render
from rest_framework.response import Response
import yfinance as yf
from rest_framework import generics
from django.db.models import Q
from .models import SP500Ticker
from .serializers import SP500TickerSerializer
from config.authentication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

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
        stocks_data = []

        for ticker in tickers:
            try:
                stock = yf.Ticker(ticker)
                hist = stock.history(period="1d")
                if not hist.empty:
                    latest = hist.iloc[-1]
                    open_price = latest['Open']
                    if open_price == 0:
                        change = "N/A"
                    else:
                        change_value = latest['Close'] - open_price
                        change_percent = (change_value / open_price) * 100
                        change = f"{round(change_value, 1)} ({round(change_percent, 1)}%)"
                    stock_data = {
                        'ticker': ticker,
                        'name': ticker,
                        'price': round(latest.get('Close', 0), 1),
                        'volume': latest.get('Volume', 0),
                        'change': change
                    }
                    stocks_data.append(stock_data)
            except Exception as e:
                print(f"Error fetching data for {ticker}: {e}")
                continue

        return Response(stocks_data)

class IndicesView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tickers = ['^VIX', 'GC=F', '^DJI', '^IXIC', '^GSPC', '^RUT']
        index_data = []

        for ticker in tickers:
            stock = yf.Ticker(ticker)
            hist = stock.history(period="1d")
            if not hist.empty:
                latest = hist.iloc[-1]
                open_price = latest['Open']
                if open_price == 0:
                    change = "N/A"
                else:
                    change_value = latest['Close'] - open_price
                    change_percent = (change_value / open_price) * 100
                    change = f"{round(change_value, 1)} ({round(change_percent, 1)}%)"
                index_data.append({
                    'name': ticker,
                    'value': latest['Close'],
                    'change': change
                })

        return Response(index_data)


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

# # 티커와 한글 이름 매핑
# TICKER_TO_KOREAN_NAME = {
#     '^VIX': 'CBOE 변동성 지수',
#     'GC=F': '금 선물',
#     '^DJI': '다우존스 산업평균지수',
#     '^IXIC': '나스닥 종합지수',
#     '^GSPC': 'S&P 500',
#     '^RUT': '러셀 2000',
# }
# @api_view(['GET'])
# def update_indices(request):
#     tickers = TICKER_TO_KOREAN_NAME.keys()
#     for ticker in tickers:
#         stock = yf.Ticker(ticker)
#         hist = stock.history(period="1d")
#         if not hist.empty:
#             latest = hist.iloc[-1]
#             open_price = latest['Open']
#             change = "N/A" if open_price == 0 else f"{latest['Close'] - open_price} ({(latest['Close'] - open_price) / open_price * 100:.2f}%)"
#             Index.objects.update_or_create(
#                 ticker=ticker,
#                 defaults={
#                     'name': ticker,
#                     'korean_name': TICKER_TO_KOREAN_NAME[ticker],
#                     'value': latest['Close'],
#                     'change': change
#                 }
#             )
#     return Response({'status': 'Indices updated successfully'})