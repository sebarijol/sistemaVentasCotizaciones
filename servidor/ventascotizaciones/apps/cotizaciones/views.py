from rest_framework.decorators import action
from rest_framework import viewsets
from .models import Cotizacion, ItemCotizacion
from .serializers import CotizacionSerializer, ItemCotizacionSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.http import HttpResponse
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from io import BytesIO

class CotizacionViewSet(viewsets.ModelViewSet):
    queryset = Cotizacion.objects.all().order_by('-fecha')
    serializer_class = CotizacionSerializer
    # permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['get'])
    def pdf(self, request, pk=None):
        cot = self.get_object()

        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)

        y = 750
        p.setFont("Helvetica-Bold", 16)
        p.drawString(50, y, f"COTIZACIÓN #{cot.id_cotizacion}")

        y -= 30
        p.setFont("Helvetica", 12)
        p.drawString(50, y, f"Cliente: {cot.cliente.nombre}")

        y -= 20
        p.drawString(50, y, f"Vendedor: {cot.vendedor.nombre}")

        y -= 20
        p.drawString(50, y, f"Fecha: {cot.fecha.strftime('%d/%m/%Y %H:%M')}")

        y -= 40
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y, "Items:")

        p.setFont("Helvetica", 12)

        for item in cot.items.all():
            y -= 20
            p.drawString(60, y, f"- {item.producto.nombre}: {item.cantidad} x ${item.subtotal}")

        y -= 40
        p.setFont("Helvetica-Bold", 12)
        p.drawString(50, y, f"Descuento: {cot.descuento}%")

        y -= 20
        p.drawString(50, y, f"Impuesto: {cot.impuestos}%")

        y -= 30
        p.setFont("Helvetica-Bold", 14)
        p.drawString(50, y, f"TOTAL: ${cot.total}")

        p.showPage()
        p.save()

        buffer.seek(0)
        return HttpResponse(buffer, content_type="application/pdf")

class ItemCotizacionViewSet(viewsets.ModelViewSet):
    queryset = ItemCotizacion.objects.all()
    serializer_class = ItemCotizacionSerializer
    permission_classes = [IsAuthenticated]
