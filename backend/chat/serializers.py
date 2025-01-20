from rest_framework import serializers
from .models import ChatRequest, ChatResponse

class ChatRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRequest
        fields = '__all__'

class ChatResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatResponse
        fields = '__all__'
