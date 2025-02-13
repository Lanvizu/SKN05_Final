from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
]
user = [
    path('api/accounts/', include('dj_rest_auth.urls')),
    path('api/accounts/', include('allauth.urls')),
    path('api/accounts/', include('accounts.urls')),
]

chat = [
    path('api/chat/', include('chat.urls')),
]

stocks = [
    path('api/stocks/', include('stocks.urls')),
]

news = [
    path('api/news/', include('news.urls')),
]

urlpatterns.extend(user)
urlpatterns.extend(chat)
urlpatterns.extend(stocks)
urlpatterns.extend(news)