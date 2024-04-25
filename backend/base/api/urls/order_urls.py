from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from base.api.views import order_view as views

urlpatterns =[
    path('',views.get_all),
    path('delivers/',views.get_order_delivers),
    path('messages/',views.get_messages),
    path('my-orders/',views.get_orders_by_user),
    path('<int:pk>/',views.get_order_by_id),
    path('create/',views.create_order),
    path('delete/<int:pk>',views.delete_order),
    path('<int:pk>/pay/',views.update_order_paid),
    path('<int:pk>/deliver/',views.update_order_delivered),
    
]
