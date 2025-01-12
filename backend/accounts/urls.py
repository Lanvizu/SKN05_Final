from accounts import views
from django.urls import path, include


urlpatterns = [
    path("register/", include("dj_rest_auth.registration.urls")),
    path("google/login-request/", views.GoogleLogin.as_view()),
    path('mypage/', views.MyPageView.as_view(), name='mypage'),
]