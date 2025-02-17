from django.urls import path
from . import views

urlpatterns = [
    path('rooms/', views.ChatRoomListView.as_view(), name='chat_room_list'),
    path('room/<int:room_id>/', views.ChatView.as_view(), name='chat_room'),
    path('room/create/', views.CreateChatRoomView.as_view(), name='create_chat_room'),
    path('room/<int:room_id>/chart/', views.ChartView.as_view(), name='chart'),
    path('room/<int:room_id>/analyze-detail/', views.CompanyDetailView.as_view(), name='analyze_detail'),
    path('room/<int:room_id>/analyze-company/', views.CompanyAnalysisView.as_view(), name='analyze_company'),
    path('room/<int:room_id>/call-news/', views.CallNewsView.as_view(), name='call_news'),
    # room 통합 처리 필요
]