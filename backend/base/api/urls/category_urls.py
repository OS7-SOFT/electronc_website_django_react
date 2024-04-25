from django.urls import path
from base.api.views import category_view as views

urlpatterns =[
    path('',views.get_all),
]