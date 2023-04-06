from django.urls import path
from . import views

urlpatterns = [
    path('friends/', views.friend_manager),
    path('all-users/', views.user_list),
    path('add-friend/', views.add_friend),
    path('check-if-friend/', views.check_if_friends),
    path('accept-friend/', views.accept_request),
    path('delete-friend/', views.remove_friend),
    path('cancel-request/', views.cancel_request),
    path('decline-request/', views.decline_request),
]