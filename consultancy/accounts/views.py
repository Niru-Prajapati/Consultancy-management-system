from .serializers import SignupSerializer, LoginSerializer
from drf_yasg.utils import swagger_auto_schema
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .serializers import (

    SupportRequestSerializer
)


class SignupView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=SignupSerializer)
    def post(self, request):
        serializer = SignupSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()

            return Response(
                {
                    "message": "Signup successful",
                    "user": {
                        "id": user.id,
                        "full_name": user.get_full_name(),
                        "email": user.email,
                    },
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=LoginSerializer)
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(
            username=email,
            password=password,
        )

        if user is None:
            return Response(
                {"error": "Invalid email or password."},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(
            {
                "id": request.user.id,
                "full_name": request.user.get_full_name(),
                "email": request.user.email,
            }
        )


class AdminLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(
            username=username,
            password=password,
        )

        if user:
            if user.is_staff:
                refresh = RefreshToken.for_user(user)

                return Response(
                    {
                        "message": "Admin login successful",
                        "username": user.username,
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                    },
                    status=status.HTTP_200_OK,
                )

            return Response(
                {"error": "You are not an admin"},
                status=status.HTTP_403_FORBIDDEN,
            )

        return Response(
            {"error": "Wrong username or password"},
            status=status.HTTP_401_UNAUTHORIZED,
        )


class AdminClientsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_staff:
            return Response(
                {"error": "Admin access required"},
                status=status.HTTP_403_FORBIDDEN,
            )

        users = User.objects.filter(
            is_staff=False
        ).order_by("-date_joined")

        clients = []

        for user in users:
            clients.append(
                {
                    "id": user.id,
                    "name": user.get_full_name(),
                    "email": user.email,
                    "status": "Active" if user.is_active else "Inactive",
                }
            )

        return Response(
            clients,
            status=status.HTTP_200_OK,
        )

    def delete(self, request, client_id):
        if not request.user.is_staff:
            return Response(
                {"error": "Admin access required"},
                status=status.HTTP_403_FORBIDDEN,
            )

        try:
            user = User.objects.get(
                id=client_id,
                is_staff=False
            )
        except User.DoesNotExist:
            return Response(
                {"error": "Client not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        user.delete()

        return Response(
            {"message": "Client deleted successfully"},
            status=status.HTTP_200_OK,
        )


class SupportRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = SupportRequestSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save(user=request.user)

            return Response(
                {
                    "message": "Support request submitted successfully.",
                    "support_request": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )

    def get(self, request):
        requests = SupportRequestSerializer.objects.filter(
            user=request.user
        ).order_by("-created_at")

        serializer = SupportRequestSerializer(
            requests,
            many=True
        )

        return Response(serializer.data)
