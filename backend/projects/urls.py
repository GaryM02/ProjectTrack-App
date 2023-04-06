from django.urls import path

from . import views

urlpatterns = [
    path('projects/', views.project_list),
    path('createproject/', views.project_list),
    path('deleteproject/', views.delete_project),
]