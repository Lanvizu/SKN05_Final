from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('stocks.urls')), 
    path('api/', include('stats_repo.urls')),
]
user = [
    path('api/accounts/', include('accounts.urls')),
    path('api/accounts/', include('dj_rest_auth.urls')),
    path('api/accounts/', include('allauth.urls')),
]

chat = [
    path('api/chat/', include('chat.urls')),
]

urlpatterns.extend(user)
urlpatterns.extend(chat)