
from typing_extensions import Required
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework.validators import UniqueValidator 
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth import  authenticate
from base.models import UserModel,Product,Category,Brand,Review,OrderItem,Order,ShippingAddress



class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token =  super().get_token(user)

        return token
    def validate(self, attrs):
        data = super().validate(attrs)
        data['id'] = self.user.id
        data['username'] = self.user.username
        data['username'] = self.user.name
        data['email'] = self.user.email
        data['is_staff'] = self.user.is_staff
        data['country'] = self.user.country
        data['city'] = self.user.city
        data['phone'] = self.user.phone
        return data


class RegisterationSerializer(ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )
    password = serializers.CharField(write_only=True,validators=[validate_password])
    is_staff = serializers.BooleanField(read_only=True)
    country = serializers.CharField(read_only=True)
    city = serializers.CharField(read_only=True)
    phone = serializers.CharField(read_only=True)
    access = serializers.SerializerMethodField()
    refresh = serializers.SerializerMethodField()

    class Meta:
        model = UserModel
        fields = ['id','username','email','password','access','refresh','is_staff','country','city','phone']

    def create(self,validate_data):
        user = UserModel.objects.create(
            username = validate_data['username'],
            email = validate_data['email'],
            
        )

        user.set_password(validate_data['password'])
        user.save()

        return user

    def get_access(self,user):
        refreshToken = RefreshToken.for_user(user)
        return str(refreshToken.access_token)
        

    def get_refresh(self,user):
        refreshToken = RefreshToken.for_user(user)
        return  str(refreshToken)
        


class UserDetailsSerializer(ModelSerializer):
    orders = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = UserModel
        fields = ['id','name','username','email','country','city','phone','avatar','orders']
    
    #get user orders
    def get_orders(self,obj):
        orders = obj.order_set.all()
        serializer = OrderSerializer(orders,many=True)
        return serializer.data

class UserSerializer(ModelSerializer):
    orders = serializers.SerializerMethodField()
    class Meta:
        model = UserModel
        fields = ['id','name','username','email','country','city','phone','avatar','orders']

    def get_orders(self,obj):
        return obj.order_set.count()

#user for reivews
class UserReviewSerializers(ModelSerializer):
    class Meta:
        model=UserModel
        fields = ['username']

#Category
class CategorySerializers(ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']

#Brand 
class BrandSerializers(ModelSerializer):
    total_products = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Brand
        fields =['id','name','total_products']
    def get_total_products(self,obj):
        total = obj.product_set.all().count()
        return total

#Product
class ProductSerializers(ModelSerializer):
    reviews = serializers.SerializerMethodField(read_only=True)
    category = CategorySerializers(read_only=True)
    brand = BrandSerializers(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(write_only=True,queryset=Category.objects.all(),source='category',allow_null=True,required=False)
    brand_id = serializers.PrimaryKeyRelatedField(write_only=True,queryset=Brand.objects.all(),source='brand',allow_null=True,required=False)
    class Meta:
        model = Product
        fields ='__all__'

    def get_reviews(self,obj):
        product_reviews = obj.review_set.all()
        serializer = ReviewSerializers(product_reviews, many = True)
        return serializer.data

#Review 
class ReviewSerializers(ModelSerializer):
    user = UserReviewSerializers()
    class Meta:
        model=Review
        fields = '__all__'

#Order_items 
class OrderItemSerializers(ModelSerializer):
    class Meta:
        model=OrderItem
        fields = ['id','name','quantity','price','product','order']

   
#Order_items 
class ShippingAddressSerializers(ModelSerializer):
    class Meta:
        model=ShippingAddress
        fields = '__all__'

#order 

class OrderSerializer(ModelSerializer):
    order_items = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'
    
    def get_order_items(self,obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializers(items, many=True)
        return serializer.data
    def get_shipping_address(self,obj):
        try:
            address = ShippingAddressSerializers(obj.shippingaddress,many=False).data
        except:
            address = False
        return address
    def get_user(self,obj):
        user = UserModel.objects.filter(email= obj.user).first()
        return user.name
        

class NotifySerializer(ModelSerializer):
    class Meta:
        model=Product
        fields = ['id','name','quantity']

class MessageSerializer(ModelSerializer):
    full_name = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model=Order
        fields = ['id','full_name']

    def get_full_name(self,obj):
        full_name = ShippingAddress.objects.filter(order = obj.id).first()
        return full_name.full_name


