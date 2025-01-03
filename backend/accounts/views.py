import requests
from typing import Dict, Any

from allauth.socialaccount.models import SocialAccount
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request

from . import services
from .models import CustomUser
from config import settings


class BaseSocialLoginView(APIView):
    permission_classes = (AllowAny,)
    user: CustomUser = get_user_model()

    @csrf_exempt  # note : if postman testing needs csrftoken
    def post(self, request: Request):
        access_token: str = request.data.get("access_token")
        user_profile_request: Response = self.request_user_profile(access_token)
        print(f"request: {user_profile_request}")
        user_profile_response: Dict[str, Any] = services.access_token_is_valid(user_profile_request)
        print(f"response: {user_profile_response}")
        user_key, registration_params = self.get_account_user_primary_key(user_profile_response)

        print(f"user key:{user_key}\nregister: {registration_params}")
        try:
            user: CustomUser = self.user.objects.get(email=user_key)
            social_user: SocialAccount = SocialAccount.objects.get(user=user)
            print(social_user)

            if social_user.provider != self.platform:
                response_message = {"error": "no matching social type"}
                return Response(response_message, status=status.HTTP_400_BAD_REQUEST)

            if social_user:
                return services.social_user_login(user)

        except self.user.DoesNotExist:
            user, created = self.simple_registration(user_key)
            return services.user_does_not_exist(user, created, self.platform, registration_params)

        except SocialAccount.DoesNotExist:
            response_message = {"error": "소셜로그인 유저가 아닙니다."}
            return Response(response_message, status=status.HTTP_400_BAD_REQUEST)

    def request_user_profile(self):
        pass

    def get_account_user_primary_key(self):
        pass

    def simple_registration(self):
        pass


class GoogleLogin(BaseSocialLoginView):
    platform = "google"
    token_url = getattr(settings, "google_token_api")

    def post(self, request: Request):
        return super().post(request)

    def request_user_profile(self, access_token: str) -> Request:
        print(f"{self.token_url}?access_token={access_token}")
        return requests.get(f"{self.token_url}?access_token={access_token}")

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        return user_info_response.get("email"), user_info_response.get("user_id")

    def simple_registration(self, email):
        return self.user.objects.get_or_create(email=email)


class KakaoLogin(BaseSocialLoginView):
    platform = "kakao"
    token_url = getattr(settings, "kakao_token_api")

    def post(self, request):
        return super().post(request)

    def request_user_profile(self, access_token):
        headers = {"Authorization": f"Bearer {access_token}"}
        return requests.post(self.token_url, headers=headers)

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        return f"{user_info_response.get('id')}@kakao.com", user_info_response.get("id")

    def simple_registration(self, uid):
        return self.user.objects.get_or_create(email=uid)


class NaverLogin(BaseSocialLoginView):
    platform = "naver"
    token_url = getattr(settings, "naver_token_api")

    def post(self, request):
        return super().post(request)

    def request_user_profile(self, access_token):
        headers = {"Authorization": f"Bearer {access_token}"}
        return requests.post(self.token_url, headers=headers)

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        response = user_info_response.get("response")
        return response.get("email"), response.get("id")

    def simple_registration(self, email):
        return self.user.objects.get_or_create(email=email)