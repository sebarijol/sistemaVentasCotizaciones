from rest_framework import routers
from apps.usuarios.views import UsuarioViewSet
from apps.clientes.views import ClienteViewSet
from apps.productos.views import ProductoViewSet
from apps.productos.views import PymeViewSet
from apps.campañas.views import CampañaViewSet
from apps.notificaciones.views import NotificacionViewSet
from apps.cotizaciones.views import CotizacionViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuarios')
router.register(r'clientes', ClienteViewSet, basename='clientes')
router.register(r'productos', ProductoViewSet, basename='productos')
router.register(r'pymes', PymeViewSet, basename='pyme')
router.register(r'cotizaciones', CotizacionViewSet, basename='cotizaciones')
router.register(r'campañas', CampañaViewSet, basename='campañas')  
router.register(r'notificaciones', NotificacionViewSet, basename='notificaciones')

urlpatterns = router.urls
