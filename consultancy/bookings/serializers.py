from rest_framework import serializers
from .models import Booking, BookingDocument, Application


class BookingSerializer(serializers.ModelSerializer):
    service_name = serializers.CharField(
        source="service.name",
        read_only=True
    )

    class Meta:
        model = Booking
        fields = [
            "id",
            "service",
            "service_name",
            "provider_name",
            "booking_date",
            "booking_time",
            "phone_no",
            "status",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "created_at",
            "service_name",
        ]


class ApplicationSerializer(serializers.ModelSerializer):
    client_name = serializers.CharField(
        source="client.get_full_name",
        read_only=True
    )

    client_email = serializers.EmailField(
        source="client.email",
        read_only=True
    )

    service_name = serializers.CharField(
        source="service.name",
        read_only=True
    )

    class Meta:
        model = Application
        fields = [
            "id",
            "client_name",
            "client_email",
            "service",
            "service_name",
            "destination",
            "application_date",
            "status",
            "action",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "client_name",
            "client_email",
            "service_name",
            "application_date",
            "created_at",
        ]


class BookingDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingDocument
        fields = [
            "id",
            "booking",
            "file",
            "uploaded_at"
        ]
        read_only_fields = [
            "id",
            "uploaded_at"
        ]