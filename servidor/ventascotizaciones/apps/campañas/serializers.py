# apps/campañas/serializers.py
from rest_framework import serializers
from .models import Campaña

class CampañaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaña
        fields = '__all__'
        read_only_fields = ('id_campaña', 'fecha_creacion', 'creador', 'estado')
