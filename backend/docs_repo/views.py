from rest_framework.decorators import api_view
from django.http import HttpResponse
from .models import StockReport
from .analysis import ReportAnalysis  # 분석 클래스를 포함한 모듈

@api_view(['GET'])  # POST에서 GET으로 변경
def analyze_stock(request):
    ticker = request.GET.get('ticker', 'AAPL')  # 기본값을 AAPL로 설정
    
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

    # 분석 결과를 바로 반환
    return HttpResponse(summary)