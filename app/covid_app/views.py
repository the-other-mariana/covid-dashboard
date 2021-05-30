from django.shortcuts import render
from django.utils.safestring import SafeString
from rest_framework import viewsets
from rest_framework.response import Response

from .models import COVIDData
from .serializers import StateSexSerializer, StateSexAgeSerializer, SymptomsSerializer
import json

import pandas as pd
# Create your views here.

# second you come to views to define the endpoints. include now the serializers
# this is where we will query the database
# covidData is the obj that is represented in the db
# third, go to urls and put the endpoints

def index(request):
    context = {}
    # inside templates theres another covid_app folder with index
    return render(request, 'covid_app/index.html', context)


def pie_chart(request):
    # covid_df = pd.DataFrame.from_records(data)
    # here get the json from pandas etc etc
    donut_json = '[ { "region": "East", "fruit": "Apples", "count": "53245" }, { "region": "West", "fruit": ' \
                 '"Apples", "count": "28479" }, { "region": "South", "fruit": "Apples", "count": "19697" }, ' \
                 '{ "region": "North", "fruit": "Apples", "count": "24037" }, { "region": "Central", ' \
                 '"fruit": "Apples", "count": "40245" }, { "region": "East", "fruit": "Oranges", "count": "200" ' \
                 '}, { "region": "South", "fruit": "Oranges", "count": "200" }, { "region": "Central", ' \
                 '"fruit": "Oranges", "count": "200" }] '
    context = {'data_json': SafeString(donut_json)} # send data json to template html
    return render(request, 'covid_app/donut.html', context)


def viz(request):

    choice = request.GET['visualization']
    print("Choice:", choice)

    # first visualization: mariana
    if request.method == 'GET' and choice == "1":
        symptoms = pd.DataFrame.from_records(COVIDData.objects.all().values('id_registro', 'sexo', 'edad', 'tipo_paciente', 'diabetes', 'asma', 'hipertension', 'otra_com', 'cardiovascular', 'obesidad', 'renal_cronica', 'tabaquismo'))

        conditions = ['tabaquismo', 'diabetes', 'asma', 'hipertension', 'cardiovascular', 'obesidad', 'renal_cronica', 'otra_com']
        conditions_map = []

        for c in conditions:
            sub = symptoms.groupby(["sexo", c, "tipo_paciente"], as_index=False)["id_registro"].count()
            sub.rename(columns={"id_registro": "count"}, inplace=True)
            tab_men = sub[(sub["sexo"] == "HOMBRE") & (sub["tipo_paciente"] == "HOSPITALIZADO") & (sub[c] != "NO")]
            tab_women = sub[(sub["sexo"] == "MUJER") & (sub["tipo_paciente"] == "HOSPITALIZADO") & (sub[c] != "NO")]
            men = SafeString(tab_men.to_json(orient='records'))
            women = SafeString(tab_women.to_json(orient='records'))

            conditions_map.append(men)
            conditions_map.append(women)

        context = {'json_map': json.dumps(conditions_map), 'keys': json.dumps(conditions)}
        return render(request, 'covid_app/viz01.html', context)
    # second visualization: mariana
    if request.method == 'GET' and choice == "2":
        history = pd.DataFrame.from_records(COVIDData.objects.all().values("id_registro", "sexo", "edad", "tipo_paciente", "fecha_ingreso"))
        sub2 = history.groupby(["fecha_ingreso", "tipo_paciente"], as_index=False)["id_registro"].count()
        sub2.rename(columns={"id_registro": "count"}, inplace=True)
        h_json = SafeString(sub2.to_json(orient='records'))

        context = {'hist_json': h_json}
        return render(request, 'covid_app/viz02.html', context)

    # third visualization: Carlos
    if request.method == 'GET' and choice == "3":
        deaths = pd.DataFrame.from_records(COVIDData.objects.all().values('id_registro','fecha_def','sexo'))
        sub3 = deaths.groupby(["sexo","fecha_def"], as_index=False)["id_registro"].count()
        sub3.rename(columns={"id_registro":"count"},inplace=True)
        nosequehago = SafeString(sub3.to_json(orient='records'))

        context = {'wut':nosequehago}

        return render(request,'covid_app/viz03.html',context)

'''
class Viz01(viewsets.ViewSet):
    queryset = COVIDData.objects.all()
    #serializer_class = SymptomsSerializer

    def list(self, request, *args, **kwargs):
        #if request.method == 'GET':
        
        covid_df = pd.DataFrame.from_records(COVIDData.objects.all())
        symptoms = covid_df[["ID_REGISTRO", "SEXO", "EDAD", "TIPO_PACIENTE", "DIABETES", "ASMA", "HIPERTENSION", "OTRA_COM", "CARDIOVASCULAR", "OBESIDAD", "RENAL_CRONICA", "TABAQUISMO"]]
        sub = symptoms.groupby(["SEXO", "TABAQUISMO", "TIPO_PACIENTE"], as_index=False)["ID_REGISTRO"].count()
        sub.rename(columns={"ID_REGISTRO": "COUNT"}, inplace=True)
        tab_men = sub[(sub["SEXO"] == "HOMBRE") & (sub["TIPO_PACIENTE"] == "HOSPITALIZADO") & (sub["TABAQUISMO"] != "NO")]
        tab_women = sub[(sub["SEXO"] == "MUJER") & (sub["TIPO_PACIENTE"] == "HOSPITALIZADO") & (sub["TABAQUISMO"] != "NO")]
        context = {'data_json': SafeString(tab_men.to_json(orient='records'))}
        
        donut_json = '[ { "region": "East", "fruit": "Apples", "count": "53245" }, { "region": "West", "fruit": ' \
                     '"Apples", "count": "28479" }, { "region": "South", "fruit": "Apples", "count": "19697" }, ' \
                     '{ "region": "North", "fruit": "Apples", "count": "24037" }, { "region": "Central", ' \
                     '"fruit": "Apples", "count": "40245" }, { "region": "East", "fruit": "Oranges", "count": "200" ' \
                     '}, { "region": "South", "fruit": "Oranges", "count": "200" }, { "region": "Central", ' \
                     '"fruit": "Oranges", "count": "200" }] '
        context = {'data_json': SafeString(donut_json)}  # send data json to template html
        return Response(request, 'covid_app/viz01.html', context)
'''



class StateSexSet(viewsets.ModelViewSet):
    # if you want to filter with sql, do it here in the queryset with objects.filter(params)
    queryset = COVIDData.objects.all()
    serializer_class = StateSexSerializer # trim the db to certain fields only
    # permission_classes = [permissions.IsAuthenticated]
    filter_fields = ['entidad_res', 'municipio_res']


class StateSexAgeSet(viewsets.ViewSet):
    queryset = COVIDData.objects.all()
    serializer_class = StateSexAgeSerializer

    # overriding the viewsets' list method
    def list(self, request, *args, **kwargs):
        # uncomment for pandas json response
        # age = request.GET['age']
        # covid_df = pd.DataFrame.from_records(COVIDData.objects.filter(edad__gt=age). \
        #                                     values('id_registro', 'sexo', 'entidad_res', 'municipio_res', 'edad'))
        # print(covid_df)
        # df = covid_df["sexo"].value_counts()
        # print(df)
        # return Response(str(covid_df.to_json(orient='records')))
        donut_json = '[ { "region": "East", "fruit": "Apples", "count": "53245" }, { "region": "West", "fruit": ' \
                     '"Apples", "count": "28479" }, { "region": "South", "fruit": "Apples", "count": "19697" }, ' \
                     '{ "region": "North", "fruit": "Apples", "count": "24037" }, { "region": "Central", ' \
                     '"fruit": "Apples", "count": "40245" }, { "region": "East", "fruit": "Oranges", "count": "200" ' \
                     '}, { "region": "South", "fruit": "Oranges", "count": "200" }, { "region": "Central", ' \
                     '"fruit": "Oranges", "count": "200" }] '
        return Response(SafeString(donut_json))
