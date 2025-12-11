from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from .models import Producto
from apps.notificaciones.utils import crear_notificacion

# CUANDO SE CREA O EDITA UN PRODUCTO
@receiver(post_save, sender=Producto)
def producto_creado_o_editado(sender, instance, created, **kwargs):
    if created:
        titulo = "Nuevo producto registrado"
        mensaje = f"Se agregó el producto: {instance.nombre}"
    else:
        titulo = "Producto actualizado"
        mensaje = f"Se modificó el producto: {instance.nombre}"

    crear_notificacion(
        titulo=titulo,
        mensaje=mensaje,
        tipo="sistema",
        usuario=instance.creado_por if hasattr(instance, "creado_por") else None
    )

# CUANDO SE ELIMINA UN PRODUCTO
@receiver(post_delete, sender=Producto)
def producto_eliminado(sender, instance, **kwargs):
    crear_notificacion(
        titulo="Producto eliminado",
        mensaje=f"Se eliminó el producto: {instance.nombre}",
        tipo="sistema"
    )
