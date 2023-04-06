from .models import FriendRequest

def get_friend_request_or_false(sender, receiver):
    try:
        return FriendRequest.objects.get(sender=sender, receiver=receiver, is_active=True)
    except Exception as e:
        return False
