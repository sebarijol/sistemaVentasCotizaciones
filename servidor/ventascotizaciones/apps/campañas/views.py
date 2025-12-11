# apps/campañas/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Campaña
from .serializers import CampañaSerializer

from apps.notificaciones.utils import crear_notificacion
from apps.clientes.models import Cliente

class CampañaViewSet(viewsets.ModelViewSet):
    queryset = Campaña.objects.all().order_by('-fecha_creacion')
    serializer_class = CampañaSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(creador=self.request.user)

    # POST /campanas/<id>/enviar/
    @action(detail=True, methods=['post'])
    def enviar(self, request, pk=None):
        campaña = self.get_object()

        # Obtener clientes por etiquetas
        etiquetas = campaña.objetivo_etiquetas
        clientes = Cliente.objects.all()

        if etiquetas:
            clientes = clientes.filter(etiquetas__id__in=etiquetas).distinct()

        # generar notificaciones para cada cliente
        for cliente in clientes:
            crear_notificacion(
                usuario=cliente.usuario if hasattr(cliente, "usuario") else None,
                titulo=f"Campaña: {campaña.nombre}",
                mensaje=campaña.contenido,
                tipo=campaña.tipo,
                prioridad="media",
                campaña=campaña,
                destino_email=cliente.email if campaña.tipo == "email" else None
            )

        campaña.estado = "finalizada"
        campaña.save()

        return Response({"detail": f"Campaña enviada a {clientes.count()} clientes."})

    # POST /campañas/<id>/cambiar-estado/
    @action(detail=True, methods=['post'])
    def cambiar_estado(self, request, pk=None):
        campaña = self.get_object()
        nuevo_estado = request.data.get("estado")

        if nuevo_estado not in dict(Campaña.ESTADOS):
            return Response({"error": "Estado inválido"}, status=400)

        campaña.estado = nuevo_estado
        campaña.save()

        return Response({"detail": "Estado actualizado."})
