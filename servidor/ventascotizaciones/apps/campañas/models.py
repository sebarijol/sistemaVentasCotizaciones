from django.db import models

class Campaña(models.Model):
    id_campaña = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=120)
    regla = models.TextField()
    canal = models.CharField(max_length=50)  # correo / WhatsApp
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()

    def __str__(self):
        return self.nombre
