from rest_framework.serializers import ModelSerializer
from .models import Dialog


class DialogSerializer(ModelSerializer):
    class Meta:
        model = Dialog
        fields = ["id", "messages"]