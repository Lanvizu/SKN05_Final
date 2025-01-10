from accounts import views
from django.urls import path, include


urlpatterns = [
    path("register/", include("dj_rest_auth.registration.urls")),
    path("google/login-request/", views.GoogleLogin.as_view()),
    # 프론트 연결 테스트
    path('api/data/', views.SimpleDataView.as_view(), name='simple_data'),
]