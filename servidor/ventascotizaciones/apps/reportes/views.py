from rest_framework.views import APIView
from rest_framework.response import Response
from django.db.models import Sum, Count
from cotizaciones.models import Cotizacion
from productos.models import Producto
from clientes.models import Cliente

class DashboardReport(APIView):
    def get(self, request):
        ventas_por_mes = (
            Cotizacion.objects
            .extra(select={'mes': "strftime('%%m', fecha)"})
            .values("mes")
            .annotate(total=Sum("total"))
        )

        mejores_productos = (
            Producto.objects
            .annotate(vendido=Sum("detalleventa__cantidad"))
            .order_by("-vendido")[:10]
        )

        stock_critico = Producto.objects.filter(stock__lt=5)

        return Response({
            "ventas_por_mes": ventas_por_mes,
            "mejores_productos": mejores_productos.values("id", "nombre", "vendido"),
            "stock_critico": stock_critico.values("id", "nombre", "stock"),
        })
