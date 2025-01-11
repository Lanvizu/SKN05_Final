from django.contrib import admin
from django.urls import path
from django.urls import include

urlpatterns = [
    path('admin/', admin.site.urls),
]
user = [
    path('accounts/', include('dj_rest_auth.urls')),
    path("accounts/register/", include("dj_rest_auth.registration.urls")),
    path('accounts/', include('allauth.urls')),
    path('accounts/', include('accounts.urls')),
]

urlpatterns.extend(user)