from rest_framework import viewsets
from .models import Notificacion
from .serializers import NotificacionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.notificaciones.services.email import enviar_correo_html

class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer
    # permission_classes = [IsAuthenticated]

class TestEmail(APIView):
    def get(self, request):
        html = """
            <h2>Correo de prueba</h2>
            <p>Si estás viendo este mensaje en tu bandeja de entrada, todo funciona correctamente.</p>
        """
        
        enviar_correo_html(
            "sebareteh@gmail.com",
            "Correo de prueba del sistema",
            html
        )
        
        return Response({"mensaje": "Correo enviado correctamente"})