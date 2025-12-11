# notificaciones/serializers.py
from rest_framework import serializers
from .models import Notificacion

class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = ['id_notificacion', 'tipo', 'titulo', 'mensaje', 'prioridad', 'fecha', 'leida']
