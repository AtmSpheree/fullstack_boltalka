from rest_framework.authentication import TokenAuthentication


class TokenAuth(TokenAuthentication):
    keyword = "Bearer"
