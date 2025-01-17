from datetime import timedelta
from pathlib import Path
import sys
from .utils import Initialize_env_variables
import os

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent
CONFIG_DIR = Path(__file__).resolve().parent
SECRET_JSON = Path(CONFIG_DIR, "secrets.json")

current_module = sys.modules[__name__]
Initialize_env_variables(SECRET_JSON, current_module)

SECRET_KEY = getattr(current_module, "secret_key")
DEBUG = True # 프로덕션 환경에서는 False 설정

ALLOWED_HOSTS = ["*"] # 프로덕션 환경에서는 특정 호스트만 허용하도록 설정

# Application definition 

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    "django.contrib.sites",
]

THIRD_PARTY = [
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
]

APPLICATION = [
    "accounts",
    'chat',
]

INSTALLED_APPS += APPLICATION + THIRD_PARTY

AUTH_USER_MODEL = "accounts.CustomUser"

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'allauth.account.middleware.AccountMiddleware'
]

REST_FRAMEWORK = {
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        'dj_rest_auth.jwt_auth.JWTCookieAuthentication',
    ),
    "DEFAULT_SCHEMA_CLASS": "drf_spectacular.openapi.AutoSchema",
}

REST_AUTH = {
    "USE_JWT": True,
    "JWT_AUTH_COOKIE": "access_token",
    "JWT_AUTH_REFRESH_COOKIE": "refresh_token",
    "JWT_AUTH_HTTPONLY": True,
    "JWT_AUTH_RETURN_EXPIRATION": True,
    "JWT_AUTH_SECURE": True,  # HTTPS 연결에서만 쿠키 전송
    "JWT_AUTH_SAMESITE": "Lax",  # CSRF 보호를 위한 SameSite 설정
    "LOGIN_SERIALIZER": "accounts.serializers.UserLoginSerializer",
    "REGISTER_SERIALIZER": "accounts.serializers.UserRegistrationSerializer",
    # 'SESSION_LOGIN' : False
}
CSRF_TRUSTED_ORIGINS = ['http://localhost:3000']

ROOT_URLCONF = 'config.urls'

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

WSGI_APPLICATION = 'config.wsgi.application'

# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

# 로컬 테스트용
DATABASES = {
    'default' : {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'skn0502', # 연동할 mysql db 이름
        'USER': 'root', # db 접속 계정명
        'PASSWORD': getattr(current_module, "mysql_password"), # 해당 계정 비밀번호
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}

# Docker 환경
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.mysql',
#         'NAME': os.environ.get('MYSQL_DATABASE'),
#         'USER': os.environ.get('MYSQL_USER'),
#         'PASSWORD': os.environ.get('MYSQL_PASSWORD'),
#         'HOST': 'db',
#         'PORT': '3306',
#     }
# }

# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "ko-kr"

TIME_ZONE = "Asia/Seoul"

USE_I18N = True

USE_TZ = True

AUTHENTICATION_BACKENDS = (
    "allauth.account.auth_backends.AuthenticationBackend",
    "django.contrib.auth.backends.ModelBackend",
)
# custom variable
SITE_ID = 1
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_USER_MODEL_USERNAME_FIELD = None
REST_USE_JWT = True

ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 3
ACCOUNT_EMAIL_SUBJECT_PREFIX = ''
# ACCOUNT_EMAIL_CONFIRMATION_AUTHENTICATED_REDIRECT_URL = '/'
LOGIN_URL = 'http://localhost:3000/'

# 이메일 설정
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'ghzm888@gmail.com'
EMAIL_HOST_PASSWORD = getattr(current_module, "google_host_password")
DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
# 비밀번호 재설정 URL 설정
PASSWORD_RESET_TIMEOUT = 3600  # 1시간

# LOGIN_REDIRECT_URL = '/main/'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # 허용할 클라이언트 도메인
]
CORS_ALLOW_HEADERS = [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Allow-Origin",
    "X-CSRFToken",
    "Accept-Encoding",
    "User-Agent",
    "DNT",
    "Cache-Control",
    "X-Requested-With",
]
CORS_ALLOW_CREDENTIALS = True  # credentials: 'include' 요청 허용

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=2),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
}

SOCIALACCOUNT_PROVIDERS = {
    'google': {
        'SCOPE': [
            'profile',
            'email',
        ],
        'AUTH_PARAMS': {
            'access_type': 'online',
        },
        'OAUTH_PKCE_ENABLED': True,
    }
}

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# runpod 설정

# RUNPOD_API_KEY = getattr(current_module, "RUNPOD_API_KEY")
# RUNPOD_ENDPOINT_ID = os.getenv('RUNPOD_ENDPOINT_ID')
RUNPOD_API_KEY = 'rpa_9HQTO9ISNX2EP83M02TH7FOIIZBY27Z15IIW4P5T132k4h'