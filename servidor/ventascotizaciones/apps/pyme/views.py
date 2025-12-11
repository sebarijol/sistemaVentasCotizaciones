from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Pyme
from .serializers import PymeRegistroSerializer, PymeSerializer

class PymeRegistroViewSet(viewsets.ViewSet):
    serializer_class = PymeRegistroSerializer
    def create(self, request):
        serializer = PymeRegistroSerializer(data=request.data)
        if serializer.is_valid():
            pyme = serializer.save()
            return Response({
                "message": "Pyme registrada correctamente",
                "pyme_id": pyme.id_pyme
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CurrentPymeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        usuario = request.user

        try:
            pyme = Pyme.objects.get(administrador=usuario)
        except Pyme.DoesNotExist:
            return Response({"detail": "Este usuario no administra ninguna pyme."}, status=404)

        serializer = PymeSerializer(pyme)
        return Response(serializer.data)