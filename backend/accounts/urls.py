from accounts import views
from django.urls import path, include
from dj_rest_auth.registration.views import VerifyEmailView

urlpatterns = [
    path('login/', views.CustomLoginView.as_view(), name='custom_login'),
    path('check-auth/', views.CheckAuthView.as_view(), name='check_auth'),
    path('logout/', views.LogoutView.as_view(), name='custom_logout'),
    path("register/", include("dj_rest_auth.registration.urls")),
    path('registration/verify-email/', VerifyEmailView.as_view(), name='rest_verify_email'),
    # Social login
    path('google/login-request/', views.GoogleLoginRequest.as_view(), name='google-login-request'),
    path('google/callback/', views.GoogleLogin.as_view(), name='google-callback'),
    path('naver/login-request/', views.NaverLoginRequest.as_view(), name='naver-login-request'),
    path('naver/callback/', views.NaverLogin.as_view(), name='naver-callback'),
    path('kakao/login-request/', views.KakaoLoginRequest.as_view(), name='kakao-login-request'),
    path('kakao/callback/', views.KakaoLogin.as_view(), name='kakao-callback'),
    # Password
    path('password-reset/', views.PasswordResetRequestView.as_view(), name='password_reset'),
    path('password-reset-confirm/<uidb64>/<token>/', views.PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    # MyPage
    path('mypage/', views.MyPageView.as_view(), name='mypage'),
    path('mypage/delete/', views.DeleteAccountView.as_view(), name='delete_account'),
    # path('mypage/change-password/', views.ChangePasswordView.as_view(), name='change_password'),
    path('interest-tickers/', views.InterestTickerView.as_view(), name='interest_tickers'),
]