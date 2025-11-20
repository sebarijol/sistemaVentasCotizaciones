from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, nombre, rol, password=None):
        if not correo:
            raise ValueError("Debe ingresar un correo electrónico")
        user = self.model(correo=self.normalize_email(correo), nombre=nombre, rol=rol)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, nombre, rol='admin', password=None):
        user = self.create_user(correo, nombre, rol, password)
        user.is_superuser = True
        user.is_staff = True
        user.save(using=self._db)
        return user


class Usuario(AbstractBaseUser, PermissionsMixin):
    ROLES = [
        ('admin', 'Administrador'),
        ('vendedor', 'Vendedor'),
    ]

    id_usuario = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    rol = models.CharField(max_length=20, choices=ROLES)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = ['nombre', 'rol']

    objects = UsuarioManager()

    def __str__(self):
        return f"{self.nombre} ({self.rol})"
