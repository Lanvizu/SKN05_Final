from django.db import models

class NewsArticle(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    category = models.JSONField()
    published = models.DateField()

    def __str__(self):
        return self.title
