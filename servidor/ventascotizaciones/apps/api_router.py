from django.urls import include, path
from rest_framework import routers
from apps.usuarios.views import UsuarioViewSet
from apps.clientes.views import ClienteViewSet
from apps.productos.views import ProductoViewSet
from apps.campañas.views import CampañaViewSet
from apps.notificaciones.views import NotificacionViewSet
from apps.cotizaciones.views import CotizacionViewSet
from apps.pyme.views import PymeRegistroViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router.register(r'clientes', ClienteViewSet, basename='clientes')
router.register(r'productos', ProductoViewSet, basename='productos')
router.register(r'cotizaciones', CotizacionViewSet, basename='cotizaciones')
router.register(r'campañas', CampañaViewSet, basename='campañas')
router.register(r'notificaciones', NotificacionViewSet, basename='notificaciones')
router.register(r'pymes', PymeRegistroViewSet, basename='pymes')

urlpatterns = [
    path("", include(router.urls)),
]
