from rest_framework import viewsets
from .models import Notificacion
from .serializers import NotificacionSerializer
from rest_framework.permissions import IsAuthenticated

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    # permission_classes = [IsAuthenticated]
