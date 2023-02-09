
from django.contrib import admin
from django.urls import path,include
from furni import views
from furni import urls
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
schema_view = get_swagger_view(title='Django API')
router = routers.DefaultRouter()
router.register('productView', views.ProductViewSet,basename="views")


urlpatterns = [
    path('sw/', schema_view),
    path('admin/', admin.site.urls),
    path('views/',include(router.urls)),
    path('furni/',include('furni.urls')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]

