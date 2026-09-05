from django.urls import path
from . import views

app_name = 'profil'

urlpatterns = [
    path('', views.profil_index, name='index'),
    path('kelompok-tani/<str:kategori>/', views.kelompok_tani_list, name='kelompok_tani'),
]
