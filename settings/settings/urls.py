
from django.contrib import admin
from django.urls import path,include
from furni import views
from furni import urls
from rest_framework import routers
from rest_framework_swagger.views import get_swagger_view

schema_view = get_swagger_view(title='Django API')


urlpatterns = [
    path('sw/', schema_view),
    path('admin/', admin.site.urls),
    path('products/',include('furni.urls')),

]

