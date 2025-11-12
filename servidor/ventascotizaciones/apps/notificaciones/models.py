from django.db import models
from apps.campañas.models import Campaña

class Notificacion(models.Model):
    id_notificacion = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)
    destino = models.EmailField()
    mensaje = models.TextField()
    fecha_envio = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=20, default='pendiente')
    campaña = models.ForeignKey(Campaña, on_delete=models.SET_NULL, null=True, blank=True)
