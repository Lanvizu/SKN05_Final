from django.db import models

class ChatRequest(models.Model):
    user_input = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class ChatResponse(models.Model):
    request = models.ForeignKey(ChatRequest, on_delete=models.CASCADE, related_name='responses')
    response_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
