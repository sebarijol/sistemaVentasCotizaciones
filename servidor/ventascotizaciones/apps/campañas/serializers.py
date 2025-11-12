from rest_framework import serializers
from .models import Campaña

class CampañaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Campaña
        fields = '__all__'
