
from audioop import reverse
from urllib.error import HTTPError
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions,status
from rest_framework.pagination import PageNumberPagination
from base.models import Product, Order,OrderItem,ShippingAddress
from django.db.models import Q,Count
from base.api.serializers import OrderSerializer,MessageSerializer
from datetime import datetime

#get all orders
@permission_classes([permissions.IsAdminUser])
@api_view(['GET'])
def get_all(request):
    orders = Order.objects.filter(is_delivered = False)

    sort_by = request.GET.get('sort')
    page_size = request.GET.get('page-size') 
    keysearch = request.GET.get('keysearch')  
    select_paid = request.GET.get('is-paid')
    
    #Filter
    if keysearch:
        orders = orders.filter(Q(user__name__icontains=keysearch))
    if select_paid:
        orders = orders.filter(is_paid=True) if select_paid=="True"  else orders.filter(is_paid=False)
   
    if sort_by:
        if sort_by[4:] == "total_price":
            orders =  orders.order_by(f"-{sort_by[4:]}").reverse()  if sort_by[0:3] == "min" else orders.order_by(f"-{sort_by[4:]}")
        elif sort_by == "create-date":
            orders =  orders.order_by('-created')
        elif sort_by[4:] == "item-count":
            orders = orders.annotate(num_items=Count('orderitem')).order_by("-num_items") if sort_by[0:3] == "max" else  orders.annotate(num_items=Count('orderitem')).order_by("-num_items").reverse()
   
    
    #pagination
    paginator = PageNumberPagination()
    if page_size:
            paginator.page_size = page_size
    result = paginator.paginate_queryset(orders,request)
    serializer = OrderSerializer(result,many=True)

    context = {
            "next":paginator.get_next_link(),
            "page_number":paginator.get_page_number(request,result),
            "count":paginator.page.paginator.num_pages,
            "previous":paginator.get_previous_link(),
            "orders":serializer.data,
    }

    return Response(context)

#get all orders
@api_view(['GET'])
def get_order_delivers(request):
    orders = Order.objects.filter(is_delivered = True)

    sort_by = request.GET.get('sort')
    page_size = request.GET.get('page-size') 
    keysearch = request.GET.get('keysearch')  
    select_paid = request.GET.get('is-paid')
    
    #Filter
    if keysearch:
        orders = orders.filter(Q(user__name__icontains=keysearch))
    if select_paid:
        orders = orders.filter(is_paid=True) if select_paid=="True"  else orders.filter(is_paid=False)
   
    if sort_by:
        if sort_by[4:] == "total_price":
            orders =  orders.order_by(f"-{sort_by[4:]}").reverse()  if sort_by[0:3] == "min" else orders.order_by(f"-{sort_by[4:]}")
        elif sort_by == "create-date":
            orders =  orders.order_by('-created')
        elif sort_by[4:] == "item-count":
            orders = orders.annotate(num_items=Count('orderitem')).order_by("-num_items") if sort_by[0:3] == "max" else  orders.annotate(num_items=Count('orderitem')).order_by("-num_items").reverse()
    #pagination
    paginator = PageNumberPagination()
    if page_size:
            paginator.page_size = page_size
    result = paginator.paginate_queryset(orders,request)
    serializer = OrderSerializer(result,many=True)

    context = {
            "next":paginator.get_next_link(),
            "page_number":paginator.get_page_number(request,result),
            "count":paginator.page.paginator.num_pages,
            "previous":paginator.get_previous_link(),
            "orders":serializer.data,
    }

    return Response(context)




#get orders by user
@api_view(['GET'])
def get_orders_by_user(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders,many=True)
    return Response(serializer.data)

#get order by id
@api_view(['GET'])
def get_order_by_id(request,pk):
    try:
        order = Order.objects.get(id=pk)
        user = request.user

        if user.is_staff or order.user == user :
            serializer = OrderSerializer(order,many=False)
            return Response(serializer.data)
        return Response({"detail":"You cannot access to anthor user orders"},status=400)
    except:
        return Response({"detail":"Order Does not exist"})

#create order
@api_view(['POST'])
def create_order(requset):
    user = requset.user
    data = requset.data

    # creat order
    order = Order.objects.create(
        user = user,
        total_price = data['total_price']
    )
    # create shipping address
    shipping_address = ShippingAddress.objects.create(
        order = order,
        full_name = data['shipping_address']['firstName'] +" "+data['shipping_address']['lastName'],
        address = data['shipping_address']['address'],
        email = data['shipping_address']['email'],
        city = data['shipping_address']['city'],
        country = data['shipping_address']['country'],
        zip_code = data['shipping_address']['zip_code'],
        phone = data['shipping_address']['phone'],
    )
    #create order item
    order_items = data['order_items']
    
    for i in order_items:
        
        product = Product.objects.get(id=i['productId'])

        item = OrderItem.objects.create(
            product = product,
            order = order,
            name= product.name,
            quantity = i['quantity'],
            price = product.new_price * i['quantity']
        )

        #update product quantity
        product.quantity -= item.quantity
        product.save()
    
    serializer = OrderSerializer(order,many = False)
    return Response(serializer.data)



#update order paid
@api_view(['PUT'])
def update_order_paid(request,pk):
    order = Order.objects.get(id=pk)
    order.is_paid = True
    order.paid_date = datetime.now()
    order.save()
    return Response("order was paid")

#update order delivered
@api_view(['PUT'])
def update_order_delivered(request,pk):
    order = Order.objects.get(id=pk)
    order.is_delivered = True
    order.delivered_date = datetime.now()
    order.save()
    return Response("order was delivered")

#delete order
@permission_classes([permissions.IsAuthenticated])
@api_view(['DELETE'])
def delete_order(request,pk):
    try:
        order = Order.objects.get(id=pk)
        user = request.user
        if user.is_staff or order.user == user : 
            order.delete()
            return Response({"deleted":"Deleted Successfully"},status= status.HTTP_200_OK)
        return Response({"detail":"You cannot access to anthor user orders"},status= status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail":"Order Does not exist"},status= status.HTTP_404_NOT_FOUND)


#Get message for any order is paid
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def get_messages(request):
    messages = Order.objects.filter(is_paid = True,is_delivered = False)
    if messages:
        serializer = MessageSerializer(messages,many=True)
        return Response(serializer.data)
    return Response(request,status=status.HTTP_404_NOT_FOUND)

