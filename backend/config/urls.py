from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
]
user = [
    path('api/accounts/', include('accounts.urls')),
    path('api/accounts/', include('dj_rest_auth.urls')),
    path('api/accounts/', include('allauth.urls')),
]

urlpatterns.extend(user)