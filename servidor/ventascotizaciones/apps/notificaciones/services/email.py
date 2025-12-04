from django.core.mail import EmailMultiAlternatives

def enviar_correo_html(destino, asunto, html):
    msg = EmailMultiAlternatives(
        subject=asunto,
        body="",
        from_email=None,
        to=[destino],
    )
    msg.attach_alternative(html, "text/html")
    msg.send()
