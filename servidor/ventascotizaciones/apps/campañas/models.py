# apps/campañas/models.py
from django.db import models
from django.contrib.auth import get_user_model

Usuario = get_user_model()

class Campaña(models.Model):
    TIPOS = [
        ("email", "Email"),
        ("whatsapp", "WhatsApp"),
        ("notificacion", "Notificación Interna"),
    ]

    ESTADOS = [
        ("pendiente", "Pendiente"),
        ("en_proceso", "En Proceso"),
        ("finalizada", "Finalizada"),
        ("fallida", "Fallida"),
    ]

    id_campaña = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=120)
    descripcion = models.TextField(blank=True)

    # Tipo de envío
    tipo = models.CharField(max_length=20, choices=TIPOS, default="email")

    # Programación automática
    programada_para = models.DateTimeField(null=True, blank=True)

    # Contenido del mensaje
    contenido = models.TextField()

    # Etiquetas objetivo (sin relación M2M para no complicar)
    objetivo_etiquetas = models.JSONField(default=list, blank=True)

    estado = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")

    creador = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        related_name="campañas"
    )

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nombre} ({self.tipo})"
