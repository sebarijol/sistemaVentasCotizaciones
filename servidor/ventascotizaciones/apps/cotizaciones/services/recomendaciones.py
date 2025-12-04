from apps.productos.models import Producto
from apps.notificaciones.services.email import enviar_correo

def enviar_recomendaciones(cliente, producto):
    similares = list(
        Producto.objects.filter(tipo=producto.tipo)
        .exclude(id=producto.id_producto)[:3]
    )

    if not similares:
        return

    asunto = f"Recomendaciones basadas en tu compra de {producto.nombre}"

    lista = "\n".join([f"- {p.nombre}" for p in similares])

    mensaje = f"""
Hola {cliente.nombre},

Gracias por tu compra reciente de: {producto.nombre}.

Creemos que también podrían interesarte estos productos:

{lista}

¡Gracias por preferirnos!
"""

    enviar_correo(cliente.email, asunto, mensaje)
