from .models import Notificacion

def crear_notificacion(
    titulo,
    mensaje,
    tipo="sistema",
    usuario=None,
    prioridad="media",
    campaña=None,
    destino_email=None
):
    Notificacion.objects.create(
        titulo=titulo,
        mensaje=mensaje,
        tipo=tipo,
        usuario=usuario,
        prioridad=prioridad,
        campaña=campaña,
        destino_email=destino_email
    )
