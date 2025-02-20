from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework.response import Response
from rest_framework.request import Request
from config import settings
from django.utils import timezone
from typing import Union, Dict, Any
from accounts.redis_service import store_refresh_token, get_refresh_token, delete_refresh_token
from .models import CustomUser
from django.contrib.auth import get_user_model

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
    refresh_token_str = str(refresh)

    refresh_lifetime = settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME']
    expiration_seconds = int(refresh_lifetime.total_seconds())

    store_refresh_token(user.id, refresh_token_str, expiration_seconds)

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
        refresh_token_str,
        expires=timezone.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
        httponly=settings.REST_AUTH['JWT_AUTH_HTTPONLY'],
        samesite=settings.REST_AUTH['JWT_AUTH_SAMESITE'],
        secure=settings.REST_AUTH['JWT_AUTH_SECURE']
    )
    return response

def refresh_access_token_service(request):
    try:
        client_refresh_token = request.COOKIES.get(settings.REST_AUTH['JWT_AUTH_REFRESH_COOKIE'])
        if not client_refresh_token:
            return Response({'error': '리프레시 토큰이 없습니다. 다시 로그인 해주세요.'}, status=401)

        try:
            rt = RefreshToken(client_refresh_token)
        except TokenError:
            return Response({'error': '유효하지 않은 리프레시 토큰입니다. 다시 로그인 해주세요.'}, status=401)

        user_id = rt.payload.get('user_id')
        if not user_id:
            return Response({'error': '리프레시 토큰에 사용자 정보가 없습니다.'}, status=401)

        stored_refresh_token = get_refresh_token(user_id)
        if not stored_refresh_token:
            return Response({'error': 'Redis에 저장된 리프레시 토큰이 없습니다. 다시 로그인 해주세요.'}, status=401)
        if client_refresh_token != stored_refresh_token:
            delete_refresh_token(user_id)
            return Response({'error': '리프레시 토큰이 일치하지 않습니다. 다시 로그인 해주세요.'}, status=401)

        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'error': '사용자를 찾을 수 없습니다.'}, status=401)

        response = Response({'detail': '토큰이 성공적으로 갱신되었습니다.'}, status=200)
        response = set_jwt_cookies(response, user)
        return response

    except Exception as e:
        return Response({'error': str(e)}, status=500)