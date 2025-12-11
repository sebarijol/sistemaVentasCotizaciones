from rest_framework import serializers
from rest_framework import serializers
from .models import Producto, Etiqueta

class EtiquetaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Etiqueta
        fields = "__all__"

    
class ProductoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Producto
        fields = "__all__"
