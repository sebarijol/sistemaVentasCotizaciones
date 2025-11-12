from rest_framework import serializers
from .models import Cotizacion, ItemCotizacion

class ItemCotizacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemCotizacion
        fields = '__all__'

class CotizacionSerializer(serializers.ModelSerializer):
    items = ItemCotizacionSerializer(many=True, read_only=True)

    class Meta:
        model = Cotizacion
        fields = '__all__'
