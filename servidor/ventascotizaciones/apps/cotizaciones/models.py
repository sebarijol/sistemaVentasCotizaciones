from django.db import models
from apps.usuarios.models import Usuario
from apps.clientes.models import Cliente
from apps.productos.models import Producto
from decimal import Decimal

class Cotizacion(models.Model):
    id_cotizacion = models.AutoField(primary_key=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    vendedor = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)

    descuento = models.DecimalField(max_digits=5, decimal_places=2, default=0)   # porcentaje
    impuestos = models.DecimalField(max_digits=5, decimal_places=2, default=0)   # porcentaje

    total = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    estado = models.CharField(max_length=50, default='Pendiente')

    def __str__(self):
        return f"Cotización #{self.id_cotizacion} - {self.cliente.nombre}"

    @property
    def total_calculado(self):
        subtotal = sum(item.subtotal for item in self.items.all())
        return Decimal(subtotal) - Decimal(self.descuento) + Decimal(self.impuestos)

class ItemCotizacion(models.Model):
    id_item = models.AutoField(primary_key=True)
    cotizacion = models.ForeignKey(Cotizacion, on_delete=models.CASCADE, related_name='items')
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    subtotal = models.DecimalField(max_digits=12, decimal_places=2, default=0)
