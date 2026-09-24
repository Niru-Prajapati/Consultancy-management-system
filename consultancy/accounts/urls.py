from django.urls import path
from .views import SignupView, LoginView, ProfileView, AdminLoginView, AdminClientsView, SupportRequestView

urlpatterns = [
    path("signup/", SignupView.as_view(), name="signup"),
    path("login/", LoginView.as_view(), name="login"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("admin-login/", AdminLoginView.as_view(), name="admin_login"),
    path(
        "admin/clients/",
        AdminClientsView.as_view(),
        name="admin_clients",
    ),
    path(
        "admin/clients/<int:client_id>/",
        AdminClientsView.as_view(),
        name="admin_client_delete",
    ),
    path(
    "support/",
    SupportRequestView.as_view(),
    name="support",
),
]
