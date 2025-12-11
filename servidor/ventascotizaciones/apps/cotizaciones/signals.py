from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Cotizacion
from apps.notificaciones.utils import crear_notificacion

@receiver(post_save, sender=Cotizacion)
def cotizacion_guardada(sender, instance, created, **kwargs):
    if created:
        titulo = "Nueva cotización creada"
        mensaje = f"Cotización #{instance.id_cotizacion} registrada."
    else:
        titulo = "Cotización actualizada"
        mensaje = f"Cotización #{instance.id_cotizacion} modificada."

    crear_notificacion(titulo, mensaje, tipo="cotizacion")
