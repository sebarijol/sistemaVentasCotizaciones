from rest_framework import serializers
from django.utils import timezone
from .models import Cotizacion, ItemCotizacion

class ItemCotizacionSerializer(serializers.ModelSerializer):
    producto_nombre = serializers.CharField(source='producto.nombre', read_only=True)

    class Meta:
        model = ItemCotizacion
        fields = ['id_item', 'producto', 'producto_nombre', 'cantidad', 'subtotal']
        read_only_fields = ['subtotal']


class CotizacionSerializer(serializers.ModelSerializer):
    vendedor_nombre = serializers.CharField(source='vendedor.nombre', read_only=True)
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    items = ItemCotizacionSerializer(many=True)
    fecha_formateada = serializers.SerializerMethodField()

    class Meta:
        model = Cotizacion
        fields = [
            'id_cotizacion', 'cliente', 'cliente_nombre',
            'vendedor', 'vendedor_nombre',
            'fecha', 'fecha_formateada',
            'estado',
            'descuento', 'impuestos',   # ← ahora se incluyen
            'total',
            'items'
        ]
        read_only_fields = ['total']

    def get_fecha_formateada(self, obj):
        fecha = timezone.localtime(obj.fecha)
        meses = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ]
        return f"{fecha.day} de {meses[fecha.month - 1]} de {fecha.year} a las {fecha.strftime('%H:%M')}"

    # =====================================
    # CREATE
    # =====================================
    def create(self, validated_data):
        items_data = validated_data.pop('items')

        descuento_pct = float(validated_data.get("descuento", 0)) / 100
        impuesto_pct = float(validated_data.get("impuestos", 0)) / 100

        cot = Cotizacion.objects.create(**validated_data)

        subtotal_general = 0

        for item in items_data:
            producto = item['producto']
            cantidad = item['cantidad']
            precio = float(producto.precio)

            subtotal = precio * cantidad
            subtotal_general += subtotal

            ItemCotizacion.objects.create(
                cotizacion=cot,
                producto=producto,
                cantidad=cantidad,
                subtotal=subtotal
            )

        # APLICAR DESCUENTO E IMPUESTO
        monto_descuento = subtotal_general * descuento_pct
        monto_impuesto = subtotal_general * impuesto_pct

        total_final = subtotal_general - monto_descuento + monto_impuesto

        cot.total = round(total_final, 2)
        cot.save()

        return cot

    # =====================================
    # UPDATE (Ej: cambiar estado)
    # =====================================
    def update(self, instance, validated_data):
        instance.estado = validated_data.get("estado", instance.estado)
        instance.save()
        return instance
