from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import StockReport
from .serializers import StockReportSerializer
from .analysis import ReportAnalysis  # 분석 클래스를 포함한 모듈
import os

@api_view(['POST'])
def analyze_stock(request):
    ticker = request.data.get('ticker')
    if not ticker:
        return Response({"error": "Ticker is required"}, status=400)
    
    # ReportAnalysis 객체 생성 및 분석 수행
    report_analysis = ReportAnalysis(ticker)
    report_analysis.analyze_reports()
    result = report_analysis.financial_summarization()

    # 데이터 저장
    summary = result.get('Overall Summary', 'No summary available')
    stock_report, created = StockReport.objects.update_or_create(
        ticker=ticker,
        defaults={'summary': summary}
    )

    # 분석 결과를 직렬화하여 반환
    serializer = StockReportSerializer(stock_report)
    return Response(serializer.data)