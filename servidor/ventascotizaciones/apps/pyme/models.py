from django.db import models
from apps.usuarios.models import Usuario

class Pyme(models.Model):
    id_pyme = models.AutoField(primary_key=True, serialize=False)
    nombre = models.CharField(max_length=150)
    rut = models.CharField(max_length=20, unique=True)
    giro = models.CharField(max_length=255)
    direccion = models.CharField(max_length=200)
    región = models.CharField(max_length=100)
    comuna = models.CharField(max_length=100)
    telefono = models.CharField(max_length=30)
    correo = models.EmailField()

    iva = models.DecimalField(decimal_places=2, default=0, max_digits=5)
    impuesto_interno = models.DecimalField(decimal_places=2, default=0, max_digits=5)
    retencion = models.DecimalField(decimal_places=2, default=0, max_digits=5)

    administrador = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="pymes"
    )

    creado = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        
        return self.no