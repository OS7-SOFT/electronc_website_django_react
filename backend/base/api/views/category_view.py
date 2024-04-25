from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.api.serializers import CategorySerializers
from base.models import Category


#Get All categories

@api_view(['GET'])
def get_all(request):
    categories = Category.objects.all()
    serializer = CategorySerializers(categories,many=True)
    return Response(serializer.data)