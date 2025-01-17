from accounts import views
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

urlpatterns = [
    path('login/', views.CustomLoginView.as_view(), name='custom_login'),
    path('check-auth/', views.CheckAuthView.as_view(), name='check_auth'),
    path('logout/', views.LogoutView.as_view(), name='custom_logout'),
    path("register/", include("dj_rest_auth.registration.urls")),
    path('confirm-email/<str:key>/', ConfirmEmailView.as_view()),
    path('confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),
    path("google/login-request/", views.GoogleLogin.as_view()),
    path('mypage/', views.MyPageView.as_view(), name='mypage'),

    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
]