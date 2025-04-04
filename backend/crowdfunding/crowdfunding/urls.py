from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from projects.views import RegisterView
from projects.views import UserListView
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # ================user rejseter login acess allusers ============
    path('api/register/', RegisterView.as_view(), name='register'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/users/', UserListView.as_view(), name='user_list'),
    #================include the project urls ==========
    path('admin/', admin.site.urls),
    path('api/', include('projects.urls')),
]
