from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Project
from .serializers import ProjectSerializer
from rest_framework import status

# Create your views here.
# crud for projects
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def project_list(request, format=None):

    if request.method == 'GET':
        projects = Project.objects.filter(user=request.user.id)
        serializer = ProjectSerializer(projects, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            default_errors = serializer.errors
            field_names = []
            for field_name, field_errors in default_errors.items():
                field_names.append(field_name)
            return Response({'error': f'Invalid data in {field_names}'}, status=status.HTTP_400_BAD_REQUEST)        


@api_view(['POST'])
def delete_project(request, format=None):
    if request.method == 'POST':
        try:
            project = Project.objects.get(id=request.data['id'])
        except Project.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        project.delete()
        return Response('deleted')


@api_view(['GET', 'PUT', 'DELETE'])
def project_details(request, id, format=None):
    
    try:
        project = Project.objects.get(id=request.data['id'])
    except Project.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProjectSerializer(project)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ProjectSerializer(project, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        
        project.delete()
        return Response(status=HTTP_204_NO_CONTENT)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'status': 'request was permitted'
    }
    return Response(content)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_projects(request, format=None):
    projects = Project.objects.all()
    serializer = ProjectSerializer(projects, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_project(request):
    serializer = ProjectSerializer(data=request.data)
    print(serializer)
    serializer.is_valid(raise_exception=True)
    print('2')
    serializer.save()
    print('3')
    return Response(serializer.data)
   

