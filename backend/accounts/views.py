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

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken, BlacklistedToken
from dj_rest_auth.views import LoginView
from django.utils import timezone


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
    
class CustomLoginView(LoginView):
    def get_response(self):
        response = super().get_response()

        if self.user.is_authenticated:
            access_token = response.data.get('access')

            if access_token:
                # Set Access Token in HttpOnly cookie
                response.set_cookie(
                    settings.REST_AUTH['JWT_AUTH_COOKIE'],
                    access_token,
                    expires=timezone.now() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    httponly=settings.REST_AUTH['JWT_AUTH_HTTPONLY'],
                    samesite=settings.REST_AUTH['JWT_AUTH_SAMESITE'],
                    secure=settings.REST_AUTH['JWT_AUTH_SECURE']
                )
                response.data.pop('access', None)  # Remove Access Token from response data

            # Do not handle refresh token here (remove related code)
            response.data.pop('refresh', None)  # Optionally remove refresh token from JSON response

        return response
    
class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.REST_AUTH['JWT_AUTH_COOKIE'])
        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)
        user = self.get_user(validated_token)

        return (user, validated_token)
    
class CheckAuthView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({'detail': 'Authenticated'}, status=200)
    
class MyPageView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)
    
    # def put(self, request):
    #     serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #     return Response(serializer.errors, status=400)
        
class LogoutView(APIView):
    authentication_classes = [CookieJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # 쿠키에서 access token 추출
            access_token = request.COOKIES.get(settings.REST_AUTH['JWT_AUTH_COOKIE'])
            if not access_token:
                return Response({'error': 'No token found'}, status=status.HTTP_400_BAD_REQUEST)

            # Access token 디코딩 및 사용자 확인
            token = AccessToken(access_token)
            user_id = token.payload.get('user_id')

            # Refresh Token 블랙리스트 처리
            outstanding_tokens = OutstandingToken.objects.filter(user_id=user_id)
            for outstanding_token in outstanding_tokens:
                try:
                    RefreshToken(outstanding_token.token).blacklist()
                except TokenError:
                    continue  # 이미 블랙리스트에 있는 경우 무시

            # 응답 객체 생성 및 쿠키 삭제
            response = Response({"detail": "Successfully logged out."}, status=status.HTTP_200_OK)
            response.delete_cookie(settings.REST_AUTH['JWT_AUTH_COOKIE'], path='/')
            response.delete_cookie(settings.REST_AUTH['JWT_AUTH_REFRESH_COOKIE'], path='/')

            return response

        except TokenError:
            return Response({"error": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
