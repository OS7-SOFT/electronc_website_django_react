from urllib.error import HTTPError
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import permissions,status,generics
from rest_framework.pagination import PageNumberPagination 
from django.db.models import Q
from base.models import Product, Review, Brand
from base.api.serializers import ProductSerializers, BrandSerializers,NotifySerializer



#--------------Views

#get all products and Create new product
class ProductList(generics.ListAPIView):
    serializer_class = ProductSerializers
    pagination_class = PageNumberPagination
    queryset = Product.objects.all()
#   #GET all
    def get(self,request,format=None):
        paginator = self.pagination_class()

        #get products count 
        product_count = self.queryset.count()

        #filter self.queryset
        category = request.GET.get('category') 
        page_size = request.GET.get('page-size') 
        brands = request.GET.getlist('brands') 
        keysearch = request.GET.get('keysearch') 
        if keysearch:
            self.queryset = Product.objects.filter(Q(name__icontains=keysearch))
        if category:
            self.queryset = self.queryset.filter(category__name__icontains=category)
        if brands:
            self.queryset = self.queryset.filter(brand__in=brands)
        #sort self.queryset
        sort_by = request.GET.get('sort')
        if sort_by:
            if sort_by != "name":
                self.queryset =  self.queryset.order_by(f"-{sort_by[4:]}").reverse()  if sort_by[0:3] == "min" else self.queryset.order_by(f"-{sort_by[4:]}")
            elif sort_by == 'name': 
                self.queryset =  self.queryset.order_by(f"{sort_by}")
        
        #pagination
        if page_size:
            paginator.page_size = page_size
        result = paginator.paginate_queryset(self.queryset,request)
        serializer = ProductSerializers(result,many=True)
        
        context = {
            "next":paginator.get_next_link(),
            "page_number":paginator.get_page_number(request,result),
            "count":paginator.page.paginator.num_pages,
            "previous":paginator.get_previous_link(),
            "products_count" : product_count,
            "products":serializer.data,
        }

        return Response(context)
        

    #POST
    def post(self,request,format=None):
        serializer = ProductSerializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.error_messages,status=400)

# [PUT,DELETE,GET(by id)]
class ProductDetails(APIView):

    #select current product
    def get_product(self,pk):
        try:
            return Product.objects.get(id=pk)
        except Product.DoesNotExist:
                raise HTTPError

    def get(self,request,pk,format=None):
        product = self.get_product(pk)
        serializer = ProductSerializers(product)
        return Response(serializer.data)

    def put(self,request,pk,format=None):
        permission_classes = [permissions.IsAdminUser]
        product = self.get_product(pk)
        serializer = ProductSerializers(product,data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.data,status=400)

    def delete(self,request,pk,format=None):
        
        product = self.get_product(pk)
        product.delete()
        return Response(status=204)

#Get top products
@api_view(['GET'])
def get_top_products(request):
    products = Product.objects.order_by("-sold_count")
    if len(products) > 10 :
        top_products =  products[:10]
    else: 
        top_products = products
    serializer = ProductSerializers(top_products,many=True)
    return Response(serializer.data)

#Get Bad Product 
@api_view(['GET'])
def get_bad_products(request):
    products = Product.objects.order_by("-sold_count")
    if len(products) > 10 :
        bad_products =  products.reverse()[:10]
    else: 
        bad_products = products
    serializer = ProductSerializers(bad_products,many=True)
    return Response(serializer.data)


#Get new products
@api_view(['GET'])
def get_new_products(request):
    new_products = Product.objects.order_by("-created")[:10]
    serializer = ProductSerializers(new_products,many=True)
    return Response(serializer.data)

#Review Products
@api_view(["POST"])
def create_review_product(request,pk):
    product = Product.objects.get(id=pk)
    user = request.user
    data = request.data
    
    already_exists = product.review_set.filter(user=user).exists()

    if already_exists:
        context = {"detail":"Product already reviewd"}
        return Response(context,status=400)
    review = Review.objects.create(
        user = user,
        product = product,
        comment = data['comment'],
        rating = data['rating']
    )
    
    reviews = product.review_set.all()
    product.num_reviews = len(reviews)
    
    total_rating = 0
    for i in reviews:
        total_rating += i.rating
    product.rating = total_rating / len(reviews)
    product.save()
    return Response("Review Added")
    

#get brands
@api_view(['GET'])
def get_brands(request):
    brands = Brand.objects.all()
    serializer = BrandSerializers(brands,many=True)
    return Response(serializer.data)

#Get Notifications
@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def get_notifications(request):
    products = Product.objects.filter(quantity__lte= 20)
    if products:
        serializer = NotifySerializer(products,many=True)
        return Response(serializer.data)
    return Response(request,status=status.HTTP_204_NO_CONTENT)

#Get Related Products
@api_view(['GET'])
def get_related_products(request):
    products = Product.objects.all()
    category = request.GET.get('category')
    brand = request.GET.get('brand')
    if category:
        products = products.filter(category__name__icontains=category)
    if brand:
        products = products.filter(brand__name__icontains=brand)
    serializer = ProductSerializers(products[:4],many=True)
    return Response(serializer.data)