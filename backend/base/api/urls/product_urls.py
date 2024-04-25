from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from base.api.views import product_view as views

urlpatterns =[
    path('',views.ProductList.as_view()),
    path('brands/',views.get_brands),
    path('top/',views.get_top_products),
    path('bad/',views.get_bad_products),
    path('new/',views.get_new_products),
    path('related/',views.get_related_products),
    path('get-notifications/',views.get_notifications),
    path('<int:pk>/',views.ProductDetails.as_view()),
    path('<int:pk>/review/',views.create_review_product),
]

