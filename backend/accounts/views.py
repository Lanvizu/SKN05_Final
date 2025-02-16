import requests, secrets
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

from .serializers import UserProfileSerializer, PasswordResetRequestSerializer, PasswordResetConfirmSerializer, InterestTickerSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken
from dj_rest_auth.views import LoginView
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from config.authentication import CookieJWTAuthentication

class BaseSocialLoginView(APIView):
    permission_classes = (AllowAny,)
    user: CustomUser = get_user_model()

    @csrf_exempt
    def post(self, request: Request):
        access_token: str = request.data.get("access_token")
        user_profile_request: Response = self.request_user_profile(access_token)
        user_profile_response: Dict[str, Any] = services.access_token_is_valid(user_profile_request)
        if not user_profile_response:
            return Response({"error": "Invalid access token"}, status=status.HTTP_400_BAD_REQUEST)

        user_key, registration_params = self.get_account_user_primary_key(user_profile_response)

        try:
            user: CustomUser = self.user.objects.get(email=user_key)
            social_user: SocialAccount = SocialAccount.objects.get(user=user)

            if social_user.provider != self.platform:
                return Response({"error": "No matching social type"}, status=status.HTTP_400_BAD_REQUEST)
            if social_user:
                return services.social_user_login(user)
            # 로그인 처리
            return self.handle_successful_login(user)

        except self.user.DoesNotExist:
            # 사용자 등록 및 로그인 처리
            user, created = self.simple_registration(user_key)
            return services.user_does_not_exist(user, created, self.platform, registration_params)

        except SocialAccount.DoesNotExist:
            response_message = {"error": "소셜로그인 유저가 아닙니다."}
            return Response(response_message, status=status.HTTP_400_BAD_REQUEST)
    
    def handle_successful_login(self, user):
        response = Response({"detail": "Login successful"}, status=status.HTTP_200_OK)
        return services.set_jwt_cookies(response, user)

    def request_user_profile(self, access_token: str) -> Request:
        pass

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        pass

class GoogleLoginRequest(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        google_auth_url = (
            f"https://accounts.google.com/o/oauth2/v2/auth?"
            f"response_type=code&"
            f"client_id={settings.GOOGLE_CLIENT_ID}&"
            f"redirect_uri={settings.GOOGLE_REDIRECT_URI}&"
            f"scope=email profile"
        )
        return Response({"authorization_url": google_auth_url})

class GoogleLogin(BaseSocialLoginView):
    platform = "google"

    def get_access_token(self, request: Request) -> str:
        code = request.data.get("code")
        state = "random"
        client_id = settings.GOOGLE_CLIENT_ID
        client_secret = settings.GOOGLE_CLIENT_SECRET
        redirect_uri = settings.GOOGLE_REDIRECT_URI

        token_req = requests.post(
            f"https://oauth2.googleapis.com/token?"
            f"client_id={client_id}&"
            f"client_secret={client_secret}&"
            f"code={code}&"
            f"grant_type=authorization_code&"
            f"redirect_uri={redirect_uri}&"
            f"state={state}"
        )
        token_req_json = token_req.json()
        access_token = token_req_json.get("access_token")
        return access_token

    def post(self, request: Request):
        token = self.get_access_token(request)
        if hasattr(request.data, "_mutable"):
            request.data._mutable = True
        request.data["access_token"] = token
        return super().post(request)
    
    def request_user_profile(self, access_token: str) -> Request:
        return requests.get(f"https://www.googleapis.com/oauth2/v1/tokeninfo?access_token={access_token}")

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        email = user_info_response.get("email")
        user_id = user_info_response.get("user_id")
        return email, {"user_id": user_id}

    def simple_registration(self, email):
        return self.user.objects.get_or_create(email=email)
    
class NaverLoginRequest(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        state = secrets.token_urlsafe(16)
        request.session['naver_oauth_state'] = state
        naver_auth_url = (
            f"https://nid.naver.com/oauth2.0/authorize?"
            f"response_type=code&"
            f"client_id={settings.NAVER_CLIENT_ID}&"
            f"redirect_uri={settings.NAVER_REDIRECT_URI}&"
            f"state={state}"
        )
        return Response({"authorization_url": naver_auth_url})

    
class NaverLogin(BaseSocialLoginView):
    platform = "naver"

    def get_access_token(self, request: Request) -> str:
        code = request.data.get("code")
        state = request.data.get("state")
        client_id = settings.NAVER_CLIENT_ID
        client_secret = settings.NAVER_CLIENT_SECRET
        redirect_uri = settings.NAVER_REDIRECT_URI

        token_req = requests.post(
            f"https://nid.naver.com/oauth2.0/token?"
            f"client_id={client_id}&"
            f"client_secret={client_secret}&"
            f"code={code}&"
            f"redirect_uri={redirect_uri}&"
            f"grant_type=authorization_code&"
            f"state={state}"
        )
        token_req_json = token_req.json()
        access_token = token_req_json.get("access_token")
        return access_token

    def post(self, request: Request):
        token = self.get_access_token(request)
        if hasattr(request.data, "_mutable"):
            request.data._mutable = True
        request.data["access_token"] = token
        return super().post(request)
    
    def request_user_profile(self, access_token: str) -> Request:
        headers = {"Authorization": f"Bearer {access_token}"}
        return requests.get("https://openapi.naver.com/v1/nid/me", headers=headers)

    def get_account_user_primary_key(self, user_info_response: Dict[str, Any]):
        response_data = user_info_response.get("response", {})
        email = response_data.get("email")
        user_id = response_data.get("id")
        return email, {"user_id": user_id}

    def simple_registration(self, email):
        return self.user.objects.get_or_create(email=email)
 
class CustomLoginView(LoginView):
    def get_response(self):
        response = super().get_response()

        if self.user.is_authenticated:
            access_token = response.data.get('access')

            if access_token:
                response = services.set_jwt_cookies(response, self.user)
                response.data.pop('access', None)
                response.data.pop('refresh', None)

        return response
    
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

User = get_user_model()

class PasswordResetRequestView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            return self.process_reset_request(email)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def process_reset_request(self, email):
        try:
            user = User.objects.get(email=email)
            self.send_reset_email(user)
        except User.DoesNotExist:
            pass
        return Response({"detail": "비밀번호 재설정 이메일을 발송했습니다."}, status=status.HTTP_200_OK)

    def send_reset_email(self, user):
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}/"
        
        context = {
            'user': user,
            'reset_url': reset_url,
        }
        subject = render_to_string('password_reset_subject.txt', context)
        message = render_to_string('password_reset_email.html', context)
        
        send_mail(
            subject.strip(),
            message,
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
            html_message=message,
        )


class PasswordResetConfirmView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = User.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            serializer = PasswordResetConfirmSerializer(data=request.data)
            if serializer.is_valid():
                new_password = serializer.validated_data['new_password1']
                user.set_password(new_password)
                user.save()
                return Response({"detail": "비밀번호가 성공적으로 재설정되었습니다."}, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"error": "Invalid reset link or token expired."}, status=status.HTTP_400_BAD_REQUEST)
        
class InterestTickerView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = InterestTickerSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = InterestTickerSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)