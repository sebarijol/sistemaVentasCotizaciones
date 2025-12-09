from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, CurrentUserView

router = DefaultRouter()
router.register(r"usuarios", UsuarioViewSet, basename="usuario")

urlpatterns = [
    path("", CurrentUserView.as_view(), name="current-user"),
]