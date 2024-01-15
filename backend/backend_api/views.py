from django.shortcuts import render
from .auth import TokenAuth
from rest_framework.views import APIView
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.request import Request
from rest_framework.response import Response
from .auth import TokenAuth
from .models import Dialog, Message
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
import json
import requests


class DialogView(APIView):
    authentication_classes = (TokenAuth,)
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request, id: int):
        try:
            dialog = Dialog.objects.get(id=id, user=request.user)
        except ObjectDoesNotExist as ex:
            return Response(status=403, data={"success": "false",
                                              "message": "dialog with this id does not exist"})
        messages = sorted(Message.objects.filter(dialog=dialog),
                          key=lambda x: x.order_num)
        return Response(status=200, data={"success": "true",
                                          "dialog": {"id": dialog.id,
                                                     "messages_count": dialog.messages_count,
                                                     "messages": [i.message for i in messages]}})


class DialogsView(APIView):
    authentication_classes = (TokenAuth,)
    permission_classes = (IsAuthenticated,)

    def get(self, request: Request):
        dialogs = Dialog.objects.filter(user=request.user)
        data = []
        for dialog in dialogs:
            messages = sorted(Message.objects.filter(dialog=dialog),
                              key=lambda x: x.order_num)
            data.append({"id": dialog.id,
                         "messages_count": dialog.messages_count,
                         "messages": [s.message for s in messages]})
        return Response(status=200, data={"success": "true",
                                          "dialogs": data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuth])
def logout_view(request: Request):
    try:
        request.user.auth_token.delete()
    except (AttributeError, ObjectDoesNotExist):
        return Response(status=500, data={"success": "false",
                                          "message": "something went wrong"})
    return Response(status=200, data={"success": "true",
                                      "message": "ok"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuth])
def create_dialog_view(request: Request):
    Dialog.objects.create(user=request.user)
    return Response(status=200, data={"success": "true",
                                      "message": "ok"})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuth])
def send_message_into_dialog_view(request: Request):
    if "message" not in request.data or "dialog" not in request.data:
        return Response(status=400, data={"success": "false",
                                          "message": "invalid fields"})
    try:
        dialog = Dialog.objects.get(user=request.user, id=request.data["dialog"])
    except ObjectDoesNotExist as ex:
        return Response(status=403, data={"success": "false",
                                          "message": "dialog with this id does not exist"})
    Message.objects.create(message=request.data["message"], dialog=dialog, order_num=dialog.messages_count + 1)
    messages = sorted(Message.objects.filter(dialog=dialog),
                      key=lambda x: x.order_num)
    messages = [i.message for i in messages]
    response = requests.post(url="https://api.aicloud.sbercloud.ru/public/v2/boltalka/predict",
                             data=json.dumps({"instances": [{"contexts": [messages]}]}))
    message = json.loads(response.text)["responses"][2:-2]
    Message.objects.create(message=message, dialog=dialog, order_num=dialog.messages_count + 2)
    dialog.messages_count += 2
    dialog.save()
    return Response(status=200,
                    data={"success": "true", "message": message})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuth])
def delete_dialog_view(request: Request, id: int):
    try:
        dialog = Dialog.objects.get(user=request.user, id=id)
    except ObjectDoesNotExist as ex:
        return Response(status=403, data={"success": "false",
                                          "message": "dialog with this id does not exist"})
    dialog.delete()
    return Response(status=200, data={"success": "true",
                                      "message": "ok"})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuth])
def get_user_view(request: Request):
    return Response(status=200, data={"success": "true",
                                      "username": request.user.username})


@api_view(["POST"])
@authentication_classes([TokenAuth])
def post_user_view(request: Request):
    if request.user.is_authenticated:
        return Response(status=403, data={"success": "false",
                                          "message": "you can't register if you're already authenticated"})
    if "id" in request.data or "email" in request.data:
        return Response(status=400, data={"success": "false",
                                          "message": "you can't using id or email fields"})
    try:
        if bool(User.objects.filter(username=request.data["username"])):
            return Response(status=403, data={"success": "false",
                                              "message": "user with this username is already exists"})
        User.objects.create_user(username=request.data["username"],
                                 password=request.data["password"])
    except Exception as ex:
        return Response(status=400, data={"success": "false",
                                          "message": "invalid fields"})
    return Response(status=200, data={"success": "true", "message": "ok"})