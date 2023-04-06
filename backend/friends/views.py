from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import FriendList, FriendRequest
from .serializers import FriendSerializer
from rest_framework import status
from accounts.models import UserAccount
from .utils import get_friend_request_or_false



from accounts.serializers import UserSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def friend_manager(request, format=None):
    print(request.user.id)
    if request.method == 'GET':
        try:
            friend_list = FriendList.objects.get(user=request.user.id)
        except FriendList.DoesNotExist: 
            print('hello')
            friend_list = FriendList(user=request.user)
            friend_list.save()
        friends = friend_list.friends.all()
        print(friends)
        return Response(friends.values())


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_list(request, format=None):
    try:
        user = request.user
        print(user)
        users = UserAccount.objects.all().exclude(email=user).values()
        serializer = UserSerializer(users, many=True)
        print(serializer.data)
    except Exception as e:
        raise e

    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_friend(request, format=None, *args, **kwargs):

    if request.method == 'POST':
        print(request.data['user']) 
        
        try:
            receiver_ = UserAccount.objects.get(id=request.data['user'])
            friend_requests = FriendRequest.objects.filter(sender=request.user, receiver=receiver_)
            try:
                for request in friend_requests:
                    if request.is_active:
                        raise Exception("you are already sent a friend request")
                    else:
                        request.is_active=True
                        request.save()
                        return Response('set active to true')
                friend_request = FriendRequest(sender=request.user, receiver=receiver_)
                friend_request.save()
            except Exception as e:
                raise e
        except FriendRequest.DoesNotExist: 
            friend_request = FriendRequest(sender=request.user, receiver=receiver_)
            friend_request.save()
 

        return Response('completed')


        
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def check_if_friends(request, format=None, *args, **kwargs):
    if request.method == 'POST':
        print(request.data['user']) 
        
        try:
            receiver_ = UserAccount.objects.get(id=request.data['user'])
            
            sent = get_friend_request_or_false(sender=request.user, receiver=receiver_)
            if sent == False:
                received = get_friend_request_or_false(sender=receiver_, receiver=request.user)
                if received == False:
                    # return Response('Not Found')
                    try:
                        rec_f = FriendList.objects.get(user=receiver_)
                    except:
                        rec_f = FriendList(user=receiver_)
                        rec_f.save()

                    try:
                        sen_f = FriendList.objects.get(user=request.user.id)
                    except:
                        rec_f = FriendList(user=request.user)
                        rec_f.save()

                    if request.user in rec_f.friends.all():
                        if receiver_ in sen_f.friends.all():
                            return Response('friends')
                    else:
                        return Response('Not Found')

                return Response('received')

            return Response('sent')
                
        except Exception as e:
            raise e 
            
 

        return Response('completed')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def accept_request(request, format=None, *args, **kwargs):
    if request.method == 'POST':
        print(request.data['user']) 
        receiver = UserAccount.objects.get(id=request.data['user'])
        
        try:
            print('friend list ')
            rec_f = FriendList.objects.get(user=receiver)
        except FriendList.DoesNotExist: 
            print('no friend list ')
            rec_f = FriendList(user=receiver_)
            rec_f.save()
        
        try:
            sen_f = FriendList.objects.get(user=request.user.id)
        except FriendList.DoesNotExist: 
            print('hello')
            sen_f = FriendList(user=request.user)
            sen_f.save()
        
        try:
            friend_request = FriendRequest.objects.get(sender=receiver, receiver=request.user)
            friend_request.accept(rec_friend_lst=rec_f, sen_friend_lst=sen_f)
        except Exception as e: 
           raise e
 

        return Response('accepted request')



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def remove_friend(request, format=None, *args, **kwargs):
    if request.method == 'POST':
        print(request.data['user']) 
        receiver_ = UserAccount.objects.get(id=request.data['user'])
        
        # try:
        #     print('friend list ')
        #     rec_f = FriendList.objects.get(user=receiver)
        # except FriendList.DoesNotExist: 
        #     print('no friend list ')
        #     rec_f = FriendList(user=receiver_)
        #     rec_f.save()
        
        try:
            sen_f = FriendList.objects.get(user=request.user.id)
        except FriendList.DoesNotExist: 
            print('hello')
            sen_f = FriendList(user=request.user)
            sen_f.save()
        
        try:
            sen_f.unfriend(receiver_)
        except Exception as e: 
           raise e
 

        return Response('accepted request')
        

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def cancel_request(request, format=None, *args, **kwargs):
    if request.method == 'POST':
        print(request.data['user']) 
        receiver = UserAccount.objects.get(id=request.data['user'])
        
        try:
            friend_request = FriendRequest.objects.get(sender=request.user, receiver=receiver)
            friend_request.cancel()
        except Exception as e: 
           raise e
 

        return Response('accepted request')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def decline_request(request, format=None, *args, **kwargs):
    if request.method == 'POST':
        print(request.data['user']) 
        receiver = UserAccount.objects.get(id=request.data['user'])
    
        try:
            friend_request = FriendRequest.objects.get(sender=receiver, receiver=request.user)
            friend_request.decline()
        except Exception as e: 
           raise e
 

        return Response('accepted request')
    

    

 