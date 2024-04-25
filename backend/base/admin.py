import imp
from django.contrib import admin

# Register your models here.
from .models import Category, UserModel,Product,Brand,Order,OrderItem,ShippingAddress,Review

admin.site.register(UserModel)
admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(Review)
admin.site.register(ShippingAddress)
