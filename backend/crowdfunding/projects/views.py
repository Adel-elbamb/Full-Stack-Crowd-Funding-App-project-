from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from django.contrib.auth.models import User 
from .serializers import UserSerializer
from rest_framework import viewsets, permissions
from .models import Project
from .serializers import ProjectSerializer



#========================= git all user====================

class UserListView(APIView):
    permission_classes = [AllowAny]   # Make sure only authenticated users can access this view

    def get(self, request):
        users = User.objects.all()  # Get all users from the database
        serializer = UserSerializer(users, many=True)  # Serialize the user data
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# =========================================================================== 

# ====================projects view funcation===============
   
   
class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer

    def get_permissions(self):
        if self.request.method in ['GET']:  # Allow anyone to read
            return [permissions.AllowAny()]
        return [permissions.IsAuthenticated()]  # Require authentication for create, update, delete

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
   
   
