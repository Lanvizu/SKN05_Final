from django.contrib import admin
from django.urls import path
from django.urls import include
# from drf_spectacular.views import SpectacularJSONAPIView
# from drf_spectacular.views import SpectacularRedocView
# from drf_spectacular.views import SpectacularSwaggerView
# from drf_spectacular.views import SpectacularYAMLAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
]
user = [
    path('accounts/', include('dj_rest_auth.urls')),
    path('accounts/', include('allauth.urls')),
    path('accounts/', include('accounts.urls')),
]

# docs = [
#     path("docs/json/", SpectacularJSONAPIView.as_view(), name="schema-json"),
#     path("docs/yaml/", SpectacularYAMLAPIView.as_view(), name="swagger-yaml"),
#     path("docs/swagger/", SpectacularSwaggerView.as_view(url_name="schema-json"), name="swagger-ui"),
#     path("docs/redoc/", SpectacularRedocView.as_view(url_name="schema-json"), name="redoc"),
# ]

# app = [
#     path("api/", include("management.urls")),
# ]

urlpatterns.extend(user)
# urlpatterns.extend(app)
# urlpatterns.extend(docs)