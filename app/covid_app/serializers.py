from .models import COVIDData
from rest_framework import serializers

# first create a serializer with what you need from the dataframe

class StateSexSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = COVIDData
        fields = ['id_registro', 'sexo', 'entidad_res', 'municipio_res']


class StateSexAgeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = COVIDData
        fields = ['id_registro', 'sexo', 'entidad_res', 'municipio_res', 'edad']

class SymptomsSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = COVIDData
        fields = ["ID_REGISTRO", "SEXO", "EDAD", "TIPO_PACIENTE", "DIABETES", "ASMA", "HIPERTENSION", "OTRA_COM", "CARDIOVASCULAR", "OBESIDAD", "RENAL_CRONICA", "TABAQUISMO"]
