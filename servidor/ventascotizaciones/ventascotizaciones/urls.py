from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers

from apps import api_router
from apps.usuarios.views import UsuarioViewSet
from apps.clientes.views import ClienteViewSet
from apps.productos.views import ProductoViewSet
from apps.cotizaciones.views import CotizacionViewSet, ItemCotizacionViewSet
from apps.campañas.views import CampañaViewSet
from apps.notificaciones.views import NotificacionViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'clientes', ClienteViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'cotizaciones', CotizacionViewSet)
router.register(r'items', ItemCotizacionViewSet)
router.register(r'campañas', CampañaViewSet)
router.register(r'notificaciones', NotificacionViewSet)

urlpatterns = [
    path("admin/", admin.site.urls),

    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path('api/', include(api_router.urlpatterns)),
]