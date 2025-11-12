from rest_framework import viewsets
from .models import Campaña
from .serializers import CampañaSerializer
from rest_framework.permissions import IsAuthenticated

class CampañaViewSet(viewsets.ModelViewSet):
    queryset = Campaña.objects.all()
    serializer_class = CampañaSerializer
    permission_classes = [IsAuthenticated]
