from django.db import models

class Pyme(models.Model):
    id_pyme = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    # Impuestos configurables por pyme (porcentaje)
    iva = models.DecimalField(max_digits=5, decimal_places=2, default=0)  # ej: 19.00
    impuesto_interno = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    retencion = models.DecimalField(max_digits=5, decimal_places=2, default=0)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=120)
    sku = models.CharField(max_length=50, unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=3)

    # Relación al dueño del producto: la pyme que lo vende
    pyme = models.ForeignKey(Pyme, on_delete=models.CASCADE, related_name="productos")

    def __str__(self):
        return f"{self.nombre} ({self.sku})"
