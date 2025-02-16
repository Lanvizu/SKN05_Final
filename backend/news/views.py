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
        today = timezone.now().date()
        today_news = NewsArticle.objects.filter(published=today)

        if not today_news.exists():
            CURRENTS_API_KEY = settings.CURRENTS_API_KEY
            url = 'https://api.currentsapi.services/v1/latest-news'
            params = {
                'apiKey': CURRENTS_API_KEY,
                'language': 'en',
                'category': 'finance',
                'limit': 10
            }
            api_response = requests.get(url, params=params)
            if api_response.status_code == 200:
                api_news = api_response.json().get('news', [])
                for news_item in api_news[:10]:
                    published_str = news_item.get('published')
                    if published_str:
                        published_dt = parse_datetime(published_str)
                        published_date = published_dt.date() if published_dt else timezone.now().date()
                    else:
                        published_date = timezone.now().date()

                    NewsArticle.objects.create(
                        title=news_item.get('title', 'No Title'),
                        description=news_item.get('description', ''),
                        category=news_item.get('category', []),
                        published=published_date,
                    )
                today_news = NewsArticle.objects.filter(published=today)
            else:
                return Response(
                    {'error': 'Failed to fetch news from external API'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )

        today_news_list = list(today_news)
        selected_news = random.sample(today_news_list, 3) if len(today_news_list) > 3 else today_news_list

        serializer = NewsArticleSerializer(selected_news, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
