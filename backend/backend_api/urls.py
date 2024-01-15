from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (get_user_view, post_user_view, DialogView, create_dialog_view, DialogsView,
                    send_message_into_dialog_view, delete_dialog_view, logout_view)


urlpatterns = [
    path('login', obtain_auth_token),
    path('logout', logout_view),
    path('user', get_user_view),
    path('register', post_user_view),
    path('dialog/<int:id>', DialogView.as_view()),
    path('dialogs', DialogsView.as_view()),
    path('create_dialog', create_dialog_view),
    path('delete_dialog/<int:id>', delete_dialog_view),
    path('send_message', send_message_into_dialog_view)
]