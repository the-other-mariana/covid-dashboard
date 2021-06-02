# Covid Dashboard

Team: Carlos Ruiz, Angel Wiehl and Mariana Avalos.

This is a web visualization tool that analyzes the covid-19 cases for Mexico in 2020.

## Specfications

Language: `Python 3.8.1`

## Get Started

1. Type on a terminal the following commands:

```
$ pip install numpy
$ pip install pandas
$ pip install openpyxl
$ pip install djangorestframework
$ pip install django-import-export
$ pip install django-url-filter
```

2. Navigate to the app/ folder, and you will find the Django web application.

3. Type on a terminal:

```
$ python manage.py makemigrations
$ python manage.py migrate
```

4. Start the server on `http://localhost:8080/` by typing:

```
$ python manage.py runserver 8080
```

5. Navigate to the following url `http://localhost:8080/admin` and import the [excel file](https://github.com/the-other-mariana/covid-dashboard/blob/master/export_dataframe_prof.xlsx) with all the data to the Django Admin. You may need to authenticate if it's your first time downloading the repo. If so, do the migrate again and restart the server to access the Django Admin again.

## Sample Output

Once the server starts, go to `http://localhost:8080/covid_app/` and you will enter the webpage index. From there on, you can choose the visualization you want to see. <br />

- Hospitalized Patients Pre-conditions 

![image](https://github.com/the-other-mariana/covid-dashboard/blob/master/media/viz01-gif.gif)

- Covid-19 Cases Evolution

![image](https://github.com/the-other-mariana/covid-dashboard/blob/master/media/viz02-gif.gif)

## Delivery Files

- [Code that generates an excel dataframe](https://github.com/the-other-mariana/covid-dashboard/blob/master/covid.py)

- [Development log file](https://github.com/the-other-mariana/covid-dashboard/blob/master/DevelopmentLog.md)

- [Data Stories](https://github.com/the-other-mariana/covid-dashboard/blob/master/DataStories.md)
