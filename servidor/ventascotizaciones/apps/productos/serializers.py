from rest_framework import serializers
from .models import Producto, Pyme

class PymeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pyme
        fields = ["id_pyme", "nombre", "iva", "impuesto_interno", "retencion"]

class ProductoSerializer(serializers.ModelSerializer):
    # Mostrar información básica de la pyme además del id
    pyme = serializers.PrimaryKeyRelatedField(queryset=Pyme.objects.all())

    class Meta:
        model = Producto
        fields = ["id_producto", "nombre", "sku", "precio", "pyme"]
