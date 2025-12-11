from django.db import models

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=150)
    contacto = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    telefono = models.CharField(max_length=50, blank=True)

    etiquetas = models.ManyToManyField(
        'productos.Etiqueta',
        blank=True,
        related_name='clientes'
    )

    def __str__(self):
        return self.nombre
