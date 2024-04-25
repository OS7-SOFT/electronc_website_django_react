from urllib.error import HTTPError
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import permissions,status,generics
from rest_framework.pagination import  PageNumberPagination
from rest_framework.response import Response
from base.models import UserModel
from django.db.models import Q,Count
from base.api.serializers import MyTokenObtainPairSerializer, RegisterationSerializer,UserSerializer,UserDetailsSerializer


#Login 
class MyTokenObtainPairView(TokenObtainPairView): 
    permission_classes = [permissions.AllowAny]
    serializer_class = MyTokenObtainPairSerializer
#Register
class RegistrationView(generics.CreateAPIView):
    queryset = UserModel.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterationSerializer


#get users
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def get_all_users(request):
        users = UserModel.objects.exclude(username="os7")
        paginator = PageNumberPagination()
        #filter users
        country = request.GET.get('country') 
        page_size = request.GET.get('page-size') 
        keysearch = request.GET.get('keysearch') 
        if country:
            users = UserModel.objects.filter(country__icontains=country)
        if keysearch:
            users = UserModel.objects.filter(Q(name__icontains=keysearch))
        
        #sort users
        sort_by = request.GET.get('sort')
        if sort_by:
            if sort_by != "name":
                users = users.annotate(num_orders=Count('order')).order_by("-num_orders") if sort_by[0:3] == "max" else  users.annotate(num_orders=Count('order')).order_by("-num_orders").reverse()
            elif sort_by == 'name': 
                users =  users.order_by(f"{sort_by}")
        
        #pagination
        if page_size:
            paginator.page_size = page_size
        result = paginator.paginate_queryset(users,request)
        serializer = UserSerializer(result,many=True)
        
        context = {
            "next":paginator.get_next_link(),
            "page_number":paginator.get_page_number(request,result),
            "count":paginator.page.paginator.num_pages,
            "previous":paginator.get_previous_link(),
            "users":serializer.data,
        }

        return Response(context)


#get user details 
@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def get_user(request,pk):
    user = UserModel.objects.get(id=pk)
    if user:
        serializer = UserDetailsSerializer(user,many=False)
        return Response(serializer.data,status= status.HTTP_200_OK)
    return Response(request,status=status.HTTP_404_NOT_FOUND)


#update profile
@api_view(['PUT'])
@permission_classes([permissions.IsAuthenticated])
def update_profile(request):
    user = request.user
    data = request.data
    serializer = RegisterationSerializer(user)

    user.name = data['name']
    user.country = data['country']
    user.city = data['city']
    user.phone = data['phone']
    user.save()


    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([permissions.IsAdminUser])
def delete_user(request,pk):
    user = UserModel.objects.get(id=pk)
    if user:
        user.delete()
        return Response(status=status.HTTP_200_OK)
    return Response({"detail":"User Does not exist"},status= status.HTTP_404_NOT_FOUND)




