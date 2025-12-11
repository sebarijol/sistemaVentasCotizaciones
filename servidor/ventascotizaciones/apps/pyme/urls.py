from rest_framework.routers import DefaultRouter, path
from .views import CurrentPymeView, PymeRegistroViewSet

router = DefaultRouter()
router.register(r"registrarpyme", PymeRegistroViewSet, basename="registrarpyme")

urlpatterns = [
    path("", CurrentPymeView.as_view(), name="current-pyme"),
]