# apps/notificaciones/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Notificacion
from .serializers import NotificacionSerializer

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all().order_by('-fecha')
    serializer_class = NotificacionSerializer
    # permission_classes = [IsAuthenticated]

    # GET /notificaciones/no-leidas/
    @action(detail=False, methods=['get'])
    def no_leidas(self, request):
        usuario = request.user
        notificaciones = Notificacion.objects.filter(usuario=usuario, leida=False)
        serializer = self.get_serializer(notificaciones, many=True)
        return Response(serializer.data)

    # POST /notificaciones/<id>/marcar-leida/
    @action(detail=True, methods=['post'])
    def marcar_leida(self, request, pk=None):
        notificacion = self.get_object()
        notificacion.leida = True
        notificacion.save()
        return Response({"detail": "Notificación marcada como leída"})

    # POST /notificaciones/marcar-todas/
    @action(detail=False, methods=['post'])
    def marcar_todas(self, request):
        usuario = request.user
        Notificacion.objects.filter(usuario=usuario, leida=False).update(leida=True)
        return Response({"detail": "Todas las notificaciones fueron marcadas como leídas"})
