from django.urls import path, include
# make the urls  default 
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet
# all project urls using this 
# http://127.0.0.1:8000/api/projects/   ===> method post ==> create
# http://127.0.0.1:8000/api/projects/ ===>method Get ====> get all projects 
# http://127.0.0.1:8000/api/projects/{id}/ ====> method put ===> update 
# http://127.0.0.1:8000/api/projects/{id}/ ====> method put ===> delete 
router = DefaultRouter()
router.register(r'projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
