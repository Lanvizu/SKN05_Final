from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework.request import Request
from config import settings
from django.utils import timezone
from typing import Union, Dict, Any

from .models import CustomUser

def user_does_not_exist(user: CustomUser, created: bool, ptf: str, uid: str) -> Response:
    platform = {
        "google": "google",
        "naver": "naver",
    }
    try_login_platform: str = platform.get(ptf)
    if created:
        SocialAccount.objects.create(user_id=user.id, provider=try_login_platform, uid=uid)
        response = Response({'msg': "회원가입 성공"}, status=status.HTTP_201_CREATED)
        return set_jwt_cookies(response, user)
    return Response({'error': '회원가입 실패'}, status=status.HTTP_400_BAD_REQUEST)

def social_user_login(user: CustomUser) -> Response:
    response = Response({'msg': "로그인 성공"}, status=status.HTTP_200_OK)
    return set_jwt_cookies(response, user)

def access_token_is_valid(request: Request) -> Union[Dict[str, Any], Response]:
    if request.status_code != 200:
        error_message = {"err_msg": "Access token이 올바르지 않습니다."}
        return JsonResponse(error_message, status=request.status_code)
    return request.json()

def set_jwt_cookies(response, user):
    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)

    response.set_cookie(
        settings.REST_AUTH['JWT_AUTH_COOKIE'],
        access_token,
        expires=timezone.now() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
        httponly=settings.REST_AUTH['JWT_AUTH_HTTPONLY'],
        samesite=settings.REST_AUTH['JWT_AUTH_SAMESITE'],
        secure=settings.REST_AUTH['JWT_AUTH_SECURE']
    )
    response.set_cookie(
        settings.REST_AUTH['JWT_AUTH_REFRESH_COOKIE'],
        str(refresh),
        expires=timezone.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        httponly=settings.REST_AUTH['JWT_AUTH_HTTPONLY'],
        samesite=settings.REST_AUTH['JWT_AUTH_SAMESITE'],
        secure=settings.REST_AUTH['JWT_AUTH_SECURE']
    )
    return response