from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ProductoViewSet, EtiquetaViewSet

router = DefaultRouter()
router.register(r'productos', ProductoViewSet, basename='producto')
router.register(r'etiquetas', EtiquetaViewSet, basename='etiqueta')

urlpatterns = router.urls
