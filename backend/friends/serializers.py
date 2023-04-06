from .models import FriendList
from rest_framework import serializers

class FriendSerializer(serializers.ModelSerializer):

    class Meta:
        model = FriendList
        fields = '__all__'