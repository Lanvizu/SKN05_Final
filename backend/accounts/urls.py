from accounts import views
from django.urls import path, include
# from .views import CustomPasswordResetView
# from django.contrib.auth import views as auth_views
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

#     path('password-reset/', CustomPasswordResetView.as_view(), name='password_reset'),
#     path('password-reset/done/', 
#          auth_views.PasswordResetDoneView.as_view(template_name='accounts/password_reset_done.html'),
#          name='password_reset_done'),
#     path('reset/<uidb64>/<token>/', 
#          auth_views.PasswordResetConfirmView.as_view(template_name='accounts/password_reset_confirm.html'),
#          name='password_reset_confirm'),
#     path('reset/done/', 
#          auth_views.PasswordResetCompleteView.as_view(template_name='accounts/password_reset_complete.html'),
#          name='password_reset_complete'),

]