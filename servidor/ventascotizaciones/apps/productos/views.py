from rest_framework import viewsets
from .models import Producto, Etiqueta
from .serializers import ProductoSerializer, EtiquetaSerializer
from rest_framework.permissions import IsAuthenticated

class ProductoViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer

class EtiquetaViewSet(viewsets.ModelViewSet):
    queryset = Etiqueta.objects.all()
    serializer_class = EtiquetaSerializer
    permission_classes = [IsAuthenticated]
