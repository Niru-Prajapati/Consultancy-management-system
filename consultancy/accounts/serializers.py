from django.contrib.auth.models import User
from rest_framework import serializers
from .models import SupportRequest


class SignupSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            "full_name",
            "email",
            "password",
            "confirm_password",
        ]

        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):
        if data["password"] != data["confirm_password"]:
            raise serializers.ValidationError("Passwords do not match.")

        if User.objects.filter(email=data["email"]).exists():
            raise serializers.ValidationError("Email already exists.")

        return data

    def create(self, validated_data):
        full_name = validated_data.pop("full_name")
        validated_data.pop("confirm_password")

        name = full_name.split()

        first_name = name[0]
        last_name = " ".join(name[1:])

        user = User.objects.create_user(
            username=validated_data["email"],
            email=validated_data["email"],
            first_name=first_name,
            last_name=last_name,
            password=validated_data["password"],
        )

        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

class SupportRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportRequest
        fields = [
            "id",
            "subject",
            "message",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "created_at",
        ]