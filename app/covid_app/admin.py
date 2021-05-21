from import_export.admin import ImportExportModelAdmin
from django.contrib import admin
from .models import COVIDData

# Register your models here.


@admin.register(COVIDData)
class COVIDAdmin(ImportExportModelAdmin):
    pass

