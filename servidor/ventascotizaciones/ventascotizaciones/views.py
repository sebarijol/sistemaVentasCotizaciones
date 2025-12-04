from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.mail import send_mail
from django.http import JsonResponse
import json

@csrf_exempt
def test_email(request):
    if request.method != "POST":
        return JsonResponse({"error": "Este endpoint solo acepta POST"}, status=405)

    try:
        data = json.loads(request.body.decode("utf-8"))
    except:
        return JsonResponse({"error": "JSON inválido"}, status=400)

    asunto = data.get("asunto")
    mensaje = data.get("mensaje")
    destinatario = data.get("destinatario")

    if not asunto or not mensaje or not destinatario:
        return JsonResponse({
            "error": "Faltan campos: asunto, mensaje, destinatario"
        }, status=400)

    send_mail(
        asunto,
        mensaje,
        None,
        [destinatario],
    )

    return JsonResponse({"mensaje": "Correo enviado correctamente"})
