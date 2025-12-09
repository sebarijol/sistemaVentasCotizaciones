from rest_framework.routers import DefaultRouter
from .views import PymeRegistroViewSet

router = DefaultRouter()
router.register(r"registrarpyme", PymeRegistroViewSet, basename="registrarpyme")

urlpatterns = router.urls
