from rest_framework import viewsets, status
from rest_framework.response import Response
from .serializers import PymeRegistroSerializer

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
