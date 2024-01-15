from rest_framework.serializers import ModelSerializer
from .models import Dialog, Message


class DialogSerializer(ModelSerializer):
    class Meta:
        model = Dialog
        fields = ["id", "messages_count"]


class MessageSerializer(ModelSerializer):
    class Meta:
        model = Message
        fields = ["id", "order_num", "message"]
