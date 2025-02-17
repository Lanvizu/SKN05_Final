from datetime import timedelta
from pathlib import Path
import os
from .utils import Initialize_env_variables
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR.parent / '.env')
SECRET_KEY = os.environ.get('SECRET_KEY')
# DEBUG = os.environ.get('DEBUG', 'False') == 'True'
# ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS', '').split(',')

DEBUG = True  # 프로덕션 환경에서는 False로 설정해야 함
ALLOWED_HOSTS = ["*"]  # 프로덕션 환경에서는 특정 호스트만 허용하도록 설정해야 함

INSTALLED_APPS = [
    # Django 기본 앱
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "django.contrib.sites",
    
    # 서드파티 앱
    "corsheaders",
    "rest_framework",
    "rest_framework_simplejwt",
    "rest_framework_simplejwt.token_blacklist",
    "rest_framework.authtoken",
    "dj_rest_auth",
    "dj_rest_auth.registration",
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    
    # 사용자 정의 앱
    "accounts",
    "chat",
    "stocks",
    "news",
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'allauth.account.middleware.AccountMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": ["rest_framework.permissions.IsAuthenticated"],
    "DEFAULT_AUTHENTICATION_CLASSES": ('dj_rest_auth.jwt_auth.JWTCookieAuthentication',),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
    "DEFAULT_SESSION_AUTHENTICATION_CLASSES": [],  # 세션 인증 비활성화
}

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "access_token",
    "JWT_AUTH_REFRESH_COOKIE": "refresh_token",
    "JWT_AUTH_HTTPONLY": True,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "JWT_AUTH_SECURE": False, # HTTPS 환경에서 True
    "JWT_AUTH_SAMESITE": "Lax",
    "LOGIN_SERIALIZER": "accounts.serializers.UserLoginSerializer",
    "REGISTER_SERIALIZER": "accounts.serializers.UserRegistrationSerializer",
}

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
}

AUTH_USER_MODEL = "accounts.CustomUser"
FRONTEND_URL = os.environ.get('BASE_FRONTEND_URL')
BASE_DNS_ADDRESS = os.environ.get('BASE_DNS_ADDRESS')

# 로컬 테스트용
# DATABASES = {
#     'default' : {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': 'skn0502',
#         'USER': 'root',
#         'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
#         'HOST': '127.0.0.1',
#         'PORT': '3306',
#         'OPTIONS': {
#             'charset': 'utf8mb4',
#         },
#     }
# }
# CORS_ALLOWED_ORIGINS = [FRONTEND_URL]

# Docker 환경
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('MYSQL_DATABASE'),
        'USER': os.environ.get('MYSQL_USER'),
        'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
        'HOST': 'db',
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}
CORS_ALLOWED_ORIGINS = [FRONTEND_URL, BASE_DNS_ADDRESS]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

STATIC_URL = 'static/'

LANGUAGE_CODE = "ko-kr"
TIME_ZONE = "Asia/Seoul"
USE_I18N = True
USE_TZ = True

AUTHENTICATION_BACKENDS = (
    "allauth.account.auth_backends.AuthenticationBackend",
)

SITE_ID = 1
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_SUBJECT_PREFIX = "[퀀톡] "
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 3
REST_USE_JWT = True

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': ['profile', 'email'],
        'AUTH_PARAMS': {'access_type': 'online'},
        'OAUTH_PKCE_ENABLED': True,
    }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'ghzm888@gmail.com'
EMAIL_HOST_PASSWORD = os.environ.get('GOOGLE_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER

GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
GOOGLE_REDIRECT_URI = os.environ.get('GOOGLE_REDIRECT_URI')

NAVER_CLIENT_ID = os.environ.get('NAVER_CLIENT_ID')
NAVER_CLIENT_SECRET = os.environ.get('NAVER_CLIENT_SECRET')
NAVER_REDIRECT_URI = os.environ.get('NAVER_REDIRECT_URI')

NGROK_URL = os.environ.get('NGROK_URL')
CURRENTS_API_KEY = os.environ.get('CURRENTS_API_KEY')

CORS_ALLOW_HEADERS = [
    "Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin",
    "Access-Control-Allow-Origin", "X-CSRFToken", "Accept-Encoding",
    "User-Agent", "DNT", "Cache-Control", "X-Requested-With",
]
CORS_ALLOW_CREDENTIALS = True

ROOT_URLCONF = 'config.urls'

WSGI_APPLICATION = 'config.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LOGIN_URL = os.environ.get('BASE_FRONTEND_URL')
PASSWORD_RESET_TIMEOUT = 3600

ACCOUNT_CONFIRM_EMAIL_ON_GET = True
ACCOUNT_ADAPTER = 'accounts.adapters.CustomAccountAdapter'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# runpod 설정
# RUNPOD_API_KEY = os.environ.get('RUNPOD_API_KEY')
# RUNPOD_ENDPOINT_ID = os.getenv('RUNPOD_ENDPOINT_ID')
# OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY')
