from django.db import models
from django.contrib.auth.models import AbstractUser,Group
from rest_framework_simplejwt.models import TokenUser
# Create your models here.







#user 
class UserModel(AbstractUser):
    name = models.CharField(max_length=200,null=True,blank=True)
    email = models.EmailField(unique=True)
    country = models.CharField(max_length=200,null=True,blank=True,default="Unknown")
    city = models.CharField(max_length=200,null=True,blank=True,default="Unknown")
    phone = models.CharField(max_length=200,null=True,blank=True,default="+000 000-000-000")
    avatar = models.ImageField(null=True,blank=True,default="/avatar.svg")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

#category
class Category(models.Model):
    name=models.CharField(max_length=200)

    def __str__(self):
       return self.name

#Brand
class Brand(models.Model):
    name=models.CharField(max_length=200)

    def __str__(self):
       return self.name
       
#products
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    image_url = models.ImageField(null=True, blank=True, default='/placeholder.jpg')
    brand = models.ForeignKey(Brand,on_delete=models.SET_NULL,null=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    quantity = models.IntegerField(null=False)
    rating = models.DecimalField( max_digits=10, decimal_places=2, null=True, blank=True, default=0)
    num_reviews = models.IntegerField(null=True, blank=True, default=0)
    new_price = models.DecimalField(max_digits=10,decimal_places=2)
    old_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True,default=0)
    sold_count = models.IntegerField(null=True,blank=True,default=0)
    updated = models.DateTimeField(auto_now=True,null=True, blank=True)
    created = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    
    class Meta:
        ordering = ['-updated','-created']

    def __str__(self):
        return self.name

class Review(models.Model):
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    user = models.ForeignKey(UserModel,on_delete=models.SET_NULL,null=True)
    comment = models.CharField(max_length=500,null=True,blank=True)
    rating = models.IntegerField(null=True,blank=True,default=0)
    craeted = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.rating)

#Order
class Order(models.Model):
    user = models.ForeignKey(UserModel,on_delete=models.CASCADE,null=True)
    total_price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)
    is_paid = models.BooleanField(default=False,null=True,blank=True)
    paid_date = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    is_delivered = models.BooleanField(default=False,null=True,blank=True) 
    delivered_date = models.DateTimeField(auto_now_add=False,null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True,null=True, blank=True)

    def __str__(self):
        return str(self.created)

#Order items
class OrderItem(models.Model):
    name = models.CharField(max_length=200,null=True, blank=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True )
    quantity = models.IntegerField(null=True,blank=True,default=0)
    price = models.DecimalField(max_digits=10,decimal_places=2,null=True,blank=True)

    def __str__(self):
        return str(self.name)

#Shipping address
class ShippingAddress(models.Model):
    order = models.OneToOneField(Order,on_delete=models.CASCADE,null=True,blank=True)
    full_name = models.CharField(max_length=100,null=True,blank=True)
    address = models.CharField(max_length=100,null=True,blank=True)
    email = models.CharField(max_length=100,null=True,blank=True)
    city = models.CharField(max_length=100,null=True,blank=True)
    country = models.CharField(max_length=100,null=True,blank=True)
    zip_code = models.IntegerField(null=True,blank=True)
    phone = models.IntegerField(null=True,blank=True)

    def __str__(self):
        return self.full_name
