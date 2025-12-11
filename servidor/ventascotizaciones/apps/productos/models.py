from django.db import models

class Etiqueta(models.Model):
    nombre = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=120)
    sku = models.CharField(max_length=50, unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=3)

    etiquetas = models.ManyToManyField(Etiqueta, related_name="productos", blank=True)

    def __str__(self):
        return f"{self.nombre} ({self.sku})"
