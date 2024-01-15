from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Dialog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    messages_count = models.IntegerField(default=0)


class Message(models.Model):
    dialog = models.ForeignKey(Dialog, on_delete=models.CASCADE)
    order_num = models.IntegerField()
    message = models.CharField(max_length=100)
