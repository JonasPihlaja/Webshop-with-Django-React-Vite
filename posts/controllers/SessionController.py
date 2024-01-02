from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken

from django.views import View

class SessionController(View):
    def __init__(self) -> None:
        # Might be generalised and moved further down the line
        self.METHOD_MAP = {
            'logout': self.logout,
        }

    def __call__(self, method, request, id=None):
        permission_classes = (IsAuthenticated,)
        # Select the correct method according to the request
        response = self.METHOD_MAP[method](request=request)
        return response

    def logout(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
    