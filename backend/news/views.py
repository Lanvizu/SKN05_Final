from django.utils import timezone
from django.utils.dateparse import parse_datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import NewsArticle
from .serializers import NewsArticleSerializer
from config.authentication import CookieJWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import requests
import random

class TodayNewsView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # 오늘 날짜를 가져옴 (DateField와 비교하기 위해서)
        today = timezone.now().date()
        today_news = NewsArticle.objects.filter(published=today)

        # 오늘 뉴스가 없으면 외부 API를 호출해서 약 10개의 뉴스 데이터를 저장
        if not today_news.exists():
            CURRENTS_API_KEY = settings.CURRENTS_API_KEY
            url = 'https://api.currentsapi.services/v1/latest-news'
            params = {
                'apiKey': CURRENTS_API_KEY,
                'language': 'en',
                'category': 'finance',
                'limit': 10  # API가 limit 파라미터 지원 시 약 10개 요청
            }
            api_response = requests.get(url, params=params)
            if api_response.status_code == 200:
                api_news = api_response.json().get('news', [])
                for news_item in api_news[:10]:
                    # 'published' 필드를 datetime 객체로 변환한 후, .date()를 추출
                    published_str = news_item.get('published')
                    if published_str:
                        published_dt = parse_datetime(published_str)
                        published_date = published_dt.date() if published_dt else timezone.now().date()
                    else:
                        published_date = timezone.now().date()

                    # 뉴스 데이터를 데이터베이스에 저장 (title, description, category, published)
                    NewsArticle.objects.create(
                        title=news_item.get('title', 'No Title'),
                        description=news_item.get('description', ''),
                        category=news_item.get('category', []),
                        published=published_date,
                    )
                # 새로 저장한 오늘 날짜의 뉴스 재조회
                today_news = NewsArticle.objects.filter(published=today)
            else:
                return Response(
                    {'error': 'Failed to fetch news from external API'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        # 오늘 뉴스 중 무작위로 3개 선택
        today_news_list = list(today_news)
        selected_news = random.sample(today_news_list, 3) if len(today_news_list) > 3 else today_news_list

        serializer = NewsArticleSerializer(selected_news, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
