from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
# here you set the urls first in the router, then the view that will deal with it
router.register(r'state_s', views.StateSexSet)
router.register(r'state_a', views.StateSexAgeSet)

# then you include the router
urlpatterns = [
    path('', views.index, name='index'),
    path('pie/', views.pie_chart, name='donut'),
    path('viz/', views.viz, name='viz'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]

