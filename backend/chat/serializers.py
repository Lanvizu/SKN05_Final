from rest_framework import serializers
from .models import ChatRoom, ChatMessage

class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'is_user', 'ticker', 'type', 'content', 'created_at']

class ChatRoomSerializer(serializers.ModelSerializer):

    class Meta:
        model = ChatRoom
        fields = ['id', 'name', 'created_at']
