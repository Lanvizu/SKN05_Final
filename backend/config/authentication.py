from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings

class CookieJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        access_token = request.COOKIES.get(settings.REST_AUTH['JWT_AUTH_COOKIE'])
        if not access_token:
            return None
        
        validated_token = self.get_validated_token(access_token)
        user = self.get_user(validated_token)

        return (user, validated_token)
