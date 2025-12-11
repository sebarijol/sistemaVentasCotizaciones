from rest_framework import serializers
from apps.usuarios.models import Usuario
from .models import Pyme

class PymeRegistroSerializer(serializers.Serializer):
    # Usuario admin
    nombre_admin = serializers.CharField()
    correo_admin = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    # Pyme
    nombre = serializers.CharField()
    rut = serializers.CharField()
    giro = serializers.CharField()
    direccion = serializers.CharField()
    región = serializers.CharField()
    comuna = serializers.CharField()
    telefono = serializers.CharField()
    correo = serializers.EmailField()
    iva = serializers.DecimalField(max_digits=5, decimal_places=2)
    impuesto_interno = serializers.DecimalField(max_digits=5, decimal_places=2)
    retencion = serializers.DecimalField(max_digits=5, decimal_places=2)

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Las contraseñas no coinciden.")
        return data

    def create(self, validated_data):
        # Crear usuario administrador
        usuario = Usuario.objects.create_user(
            correo=validated_data['correo_admin'],
            nombre=validated_data['nombre_admin'],
            rol='admin',
            password=validated_data['password']
        )

        # Crear pyme asociada
        pyme = Pyme.objects.create(
            nombre=validated_data['nombre'],
            rut=validated_data['rut'],
            giro=validated_data['giro'],
            direccion=validated_data['direccion'],
            región=validated_data['región'],
            comuna=validated_data['comuna'],
            telefono=validated_data['telefono'],
            correo=validated_data['correo'],
            iva=validated_data['iva'],
            impuesto_interno=validated_data['impuesto_interno'],
            retencion=validated_data['retencion'],
            administrador=usuario
        )

        return pyme

class UsuarioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ["id_usuario", "nombre", "correo", "rol"]

class PymeSerializer(serializers.ModelSerializer):
    administrador = UsuarioSimpleSerializer(read_only=True)

    class Meta:
        model = Pyme
        fields = "__all__"