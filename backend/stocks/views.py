from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
import yfinance as yf
import pandas as pd
import matplotlib.pyplot as plt
import io
import urllib, base64
from .models import Index

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

@api_view(['GET'])
def stock_api_view(request):
    tickers = ['IONQ', 'TSLA', 'NVDA']
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

    if stocks_data:
        return Response(stocks_data)
    return Response({'error': 'No data available'}, status=404)

@api_view(['GET'])
def indices_api_view(request):
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