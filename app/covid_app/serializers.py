from .models import COVIDData
from rest_framework import serializers


class StateSexSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = COVIDData
        fields = ['id_registro', 'sexo', 'entidad_res', 'municipio_res']


class StateSexAgeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = COVIDData
        fields = ['id_registro', 'sexo', 'entidad_res', 'municipio_res', 'edad']
