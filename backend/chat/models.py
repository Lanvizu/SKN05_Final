from django.db import models
from django.conf import settings

class ChatRoom(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, on_delete=models.CASCADE, related_name='messages')
    is_user = models.BooleanField(default=True)
    ticker = models.CharField(max_length=10, default='')
    type = models.CharField(max_length=10, default='')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)