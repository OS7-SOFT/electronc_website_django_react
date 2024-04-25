from django.urls import path
from base.api.views import user_view as views

urlpatterns =[
    path('token/',views.MyTokenObtainPairView.as_view()),
    path('register/',views.RegistrationView.as_view()),
    path('users/',views.get_all_users),
    path('users/<int:pk>/',views.get_user),
    path('user-delete/<int:pk>',views.delete_user),
    path('update-profile/',views.update_profile),
]
