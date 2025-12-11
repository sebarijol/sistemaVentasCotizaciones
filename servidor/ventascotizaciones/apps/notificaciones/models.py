from django.db import models
from django.contrib.auth import get_user_model
from apps.campañas.models import Campaña

Usuario = get_user_model()

class Notificacion(models.Model):
    TIPOS = [
        ("sistema", "Sistema"),
        ("email", "Email"),
        ("whatsapp", "WhatsApp"),
        ("stock_bajo", "Stock Bajo"),
        ("venta", "Venta"),
        ("cotizacion", "Cotización"),
        ("campaña", "Campaña"),
    ]

    ESTADOS = [
        ("pendiente", "Pendiente"),
        ("enviada", "Enviada"),
        ("error", "Error"),
    ]

    PRIORIDAD = [
        ("baja", "Baja"),
        ("media", "Media"),
        ("alta", "Alta"),
    ]

    id_notificacion = models.AutoField(primary_key=True)

    # 🟦 Tipo de notificación
    tipo = models.CharField(max_length=30, choices=TIPOS, default="sistema")

    # 🟦 Usuario destino (opcional si es una notificación global)
    usuario = models.ForeignKey(
        Usuario,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        related_name="notificaciones"
    )

    # 🟦 Datos básicos
    titulo = models.CharField(max_length=150)
    mensaje = models.TextField()

    # 🟦 Metadatos
    prioridad = models.CharField(max_length=10, choices=PRIORIDAD, default="media")
    fecha = models.DateTimeField(auto_now_add=True)

    # 🟦 Estado usado para notificaciones enviadas (email / whatsapp)
    estado_envio = models.CharField(max_length=20, choices=ESTADOS, default="pendiente")

    # 🟦 Para marcar como leída en el frontend
    leida = models.BooleanField(default=False)

    # 🟦 Relación opcional con campaña
    campaña = models.ForeignKey(
        Campaña,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="notificaciones"
    )

    # 🟦 Destino de correo (solo si aplica)
    destino_email = models.EmailField(null=True, blank=True)

    def __str__(self):
        return f"{self.titulo} ({self.tipo})"
