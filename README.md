# Full-Stack-Crowd-Funding-App-project-

# 🌍 Crowd-Funding Console App

Crowd-Funding is the practice of raising small amounts of money from a large number of people to support a project or venture — usually through the internet.

This is a **full-stack application** built with:
- 🧩 **React** for the frontend (user interface)
- ⚙️ **Django + Django REST Framework (DRF)** for the backend (APIs and database logic)
- 🗂️ **SQLite** as the database (for easy development and testing)

Users can register, log in, and create fundraising campaigns with start/end dates, goals, and more.

---

## 📌 Project Goals

- Build a secure backend API using Django and DRF
- Authenticate users with JSON Web Tokens (JWT)
- Allow users to manage (create/edit/delete) their own fundraising projects
- Provide a React frontend to interact with the backend

---

## 🔐 Features

### 1. Authentication System
- User registration includes:
  - First name, Last name, Email
  - Password + Confirm password
  - Egyptian mobile number (validated using regex)
- Login with email and password
- Secure authentication using JWT tokens
- Users can only access protected resources after login

### 2. Fundraising Projects
- Authenticated users can:
  - Create projects with title, description, total target, start/end dates
  - View all projects
  - Edit or delete **only their own** projects
  - Bonus: Search for projects by date

---

## 🛠️ Backend Setup (Django + DRF)

This section explains how to install and run the backend.

### 📁 Step 1: Folder Structure

```
backend/
│
├── crowdfunding/         # Main Django project
│   ├── settings.py       # Django settings (JWT, CORS, apps)
│   ├── urls.py
│   └── ...
├── projects/             # Custom app for project logic
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   └── ...
├── db.sqlite3            # Default development database
└── manage.py
```

### 📦 Step 2: Install and Run the Backend

Open a terminal and run the following:

```bash
# 1. Go to the backend folder
cd backend

# 2. Activate the virtual environment (Windows)
venv\Scripts\activate

# 3. Install the required Python packages
pip install django
pip install djangorestframework
pip install djangorestframework-simplejwt
pip install django-cors-headers

# 4. Go into the Django project folder
cd crowdfunding

# 5. Create the database structure
python manage.py makemigrations
python manage.py migrate

# 6. (Optional) Create a superuser to access the admin panel
python manage.py createsuperuser

# 7. Start the backend development server
python manage.py runserver
```

Now the backend API will run at:  
📍 http://127.0.0.1:8000

---

## ⚙️ Backend Configuration Details

These settings are defined in `settings.py`:

### ✅ Installed Django Apps

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    ...
    'rest_framework',
    'rest_framework_simplejwt',
    'corsheaders',
    'projects',  # your custom app
]
```

### ✅ Middleware

Adds CORS support for React frontend:

```python
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    ...
]
```

### ✅ JWT Authentication Settings

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}
```

### 🔐 JWT Token Expiry

```python
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=60),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    ...
}
```

### 🌐 CORS Settings (Allow React to communicate with backend)

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # React dev server
    "http://127.0.0.1:5173"
]

CORS_ALLOW_CREDENTIALS = True
```

---

## 💻 Frontend Setup (React)

```bash
# 1. Go to the frontend folder
cd frontend

# 2. Install dependencies
npm install

# 3. Run the frontend server
npm run dev
```

React will run on:  
📍 http://localhost:5173

It will automatically send/receive requests from Django backend at port 8000.

---

## 🔄 How It All Works Together

| Layer       | Tool            | Role                                            |
|-------------|-----------------|-------------------------------------------------|
| Frontend    | React.js        | User interface and logic                        |
| API Layer   | DRF             | Handles HTTP requests, authentication, logic   |
| Database    | SQLite          | Stores users, projects, tokens, etc.            |
| Auth        | Simple JWT      | Secures login and API access via tokens         |
| CORS        | corsheaders     | Enables safe communication between React & API |

---

## 🔗 Useful Resources

- [Django REST Framework Docs](https://www.django-rest-framework.org/)
- [Simple JWT Docs](https://django-rest-framework-simplejwt.readthedocs.io/)
- [React Documentation](https://reactjs.org/)
- [SQLite Docs](https://www.sqlite.org/index.html)

---

## 🤝 Contributing

Want to help? Fork the repo and submit a pull request with your changes!

---

## 📜 License

This project is licensed under the MIT License.

