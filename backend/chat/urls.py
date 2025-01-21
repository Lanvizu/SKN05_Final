from django.urls import path
from .views import ChatRoomListView, ChatView, CreateChatRoomView

urlpatterns = [
    path('chat/rooms/', ChatRoomListView.as_view(), name='chat_room_list'),
    path('chat/room/<int:room_id>/', ChatView.as_view(), name='chat_room'),
    path('chat/room/create/', CreateChatRoomView.as_view(), name='create_chat_room'),
]