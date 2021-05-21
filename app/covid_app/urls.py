from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'state_s', views.StateSexSet)
router.register(r'state_a', views.StateSexAgeSet)

urlpatterns = [
    path('', views.index, name='index'),
    path('pie/', views.pie_chart, name='donut'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

