from rest_framework import viewsets
from .models import Cotizacion, ItemCotizacion
from .serializers import CotizacionSerializer, ItemCotizacionSerializer
from rest_framework.permissions import IsAuthenticated

class CotizacionViewSet(viewsets.ModelViewSet):
    queryset = Cotizacion.objects.all().order_by('-fecha')
    serializer_class = CotizacionSerializer
    permission_classes = [IsAuthenticated]

class ItemCotizacionViewSet(viewsets.ModelViewSet):
    queryset = ItemCotizacion.objects.all()
    serializer_class = ItemCotizacionSerializer
    permission_classes = [IsAuthenticated]
