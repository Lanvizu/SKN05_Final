from django.http import JsonResponse
from allauth.socialaccount.models import SocialAccount
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework.response import Response
from rest_framework.request import Request

from typing import Union, Dict, Any

from .models import CustomUser


def user_does_not_exist(user: CustomUser, created: bool, ptf: str, uid: str) -> Response:
    platform = {
        "kakao": "kakao",
        "google": "google",
        "naver": "naver",
    }
    try_login_platform: str = platform.get(ptf)
    if created:
        SocialAccount.objects.create(user_id=user.id, provider=try_login_platform, uid=uid)
        access_token: AccessToken = AccessToken.for_user(user)
        refresh_token: RefreshToken = RefreshToken.for_user(user)

        return Response({'refresh': str(refresh_token), 'access': str(access_token), "msg": "회원가입 성공"},
                        status=status.HTTP_201_CREATED)


def social_user_login(user: CustomUser) -> Response:
    refresh: RefreshToken = RefreshToken.for_user(user)

    return Response({'refresh': str(refresh), 'access': str(refresh.access_token), "msg": "로그인 성공"},
                    status=status.HTTP_200_OK)


def access_token_is_valid(request: Request) -> Union[Dict[str, Any], Response]:
    if request.status_code != 200:
        error_message = {"err_msg": "Access token이 올바르지 않습니다."}
        return JsonResponse(error_message, status=request.status_code)
    return request.json()