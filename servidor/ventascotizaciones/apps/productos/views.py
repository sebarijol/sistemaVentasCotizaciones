from rest_framework import viewsets
from .models import Producto, Pyme
from .serializers import ProductoSerializer, PymeSerializer

class PymeViewSet(viewsets.ModelViewSet):
    queryset = Pyme.objects.all()
    serializer_class = PymeSerializer
    # permission_classes = [IsAuthenticated]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    # serializer_class = ProductoSerializer
