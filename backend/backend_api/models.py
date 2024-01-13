from django.db import models
from django.contrib.auth.models import User
from django.conf import settings


class Dialog(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    messages = models.CharField(max_length=1000000)
