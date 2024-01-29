from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (UserView, DialogView, DialogsView,
                    send_message_into_dialog_view, logout_view)


urlpatterns = [
    path('login', obtain_auth_token),
    path('logout', logout_view),
    path('user', UserView.as_view()),
    path('dialog', DialogView.as_view()),
    path('dialog/<int:id>', DialogView.as_view()),
    path('dialogs', DialogsView.as_view()),
    path('send_message', send_message_into_dialog_view)
]