from import_export import resources

from .models import COVIDData


class COVIDResource(resources.ModelResource):
    class Meta:
        model = COVIDData
