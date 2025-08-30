# 🚀 KD Academy Campus Connect - PHP Backend

A robust PHP backend API for the KD Academy Campus Connect system, providing comprehensive database operations, authentication, and RESTful endpoints.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Database Setup](#database-setup)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Authentication](#authentication)
- [Usage Examples](#usage-examples)
- [File Structure](#file-structure)
- [Deployment](#deployment)

## ✨ Features

### 🔐 **Authentication & Security**
- JWT-based authentication system
- Password hashing with bcrypt
- Role-based access control (Student, Faculty, Admin)
- Token verification and refresh

### 📊 **Database Operations**
- Complete CRUD operations for all entities
- Advanced filtering and search capabilities
- Pagination support
- Transaction management
- Soft delete functionality

### 🎯 **Core Modules**
- **User Management**: Registration, profiles, role management
- **Course Management**: Course creation, enrollment, instructor assignment
- **Attendance Tracking**: Record attendance, generate reports, statistics
- **Performance Monitoring**: Grades, assignments, academic progress
- **Community Features**: Posts, likes, comments, social interactions
- **Event Management**: Event creation, registration, scheduling

### 🔧 **API Features**
- RESTful API design
- Standardized JSON responses
- Comprehensive error handling
- CORS support
- Request validation

## 🛠️ Technology Stack

- **Backend**: PHP 8.0+
- **Database**: MySQL 8.0+
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt password hashing
- **API**: RESTful architecture
- **Database Access**: PDO with prepared statements

## 📦 Installation

### Prerequisites
- PHP 8.0 or higher
- MySQL 8.0 or higher
- Apache/Nginx web server
- Composer (optional, for dependency management)

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/kda-campusconnect.git
cd kda-campusconnect/backend
```

### Step 2: Set Up Web Server
Configure your web server to point to the `backend` directory and ensure URL rewriting is enabled.

#### Apache Configuration
```apache
<VirtualHost *:80>
    ServerName api.kdacademy.edu.my
    DocumentRoot /path/to/kda-campusconnect/backend
    
    <Directory /path/to/kda-campusconnect/backend>
        AllowOverride All
        Require all granted
    </Directory>
    
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule ^(.*)$ api/index.php [QSA,L]
</VirtualHost>
```

#### Nginx Configuration
```nginx
server {
    listen 80;
    server_name api.kdacademy.edu.my;
    root /path/to/kda-campusconnect/backend;
    index index.php;

    location / {
        try_files $uri $uri/ /api/index.php?$query_string;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.0-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
```

## 🗄️ Database Setup

### Step 1: Create Database
```sql
CREATE DATABASE kda_campus_connect;
USE kda_campus_connect;
```

### Step 2: Import Schema
```bash
mysql -u root -p kda_campus_connect < database/schema.sql
```

### Step 3: Verify Installation
```bash
mysql -u root -p -e "USE kda_campus_connect; SHOW TABLES;"
```

## ⚙️ Configuration

### Step 1: Environment Setup
Copy the environment example file:
```bash
cp config/env.example config/.env
```

### Step 2: Configure Database
Edit `config/.env`:
```env
# Database Configuration
DB_HOST=localhost
DB_NAME=kda_campus_connect
DB_USER=your_db_user
DB_PASS=your_db_password

# JWT Secret (generate a strong secret)
JWT_SECRET=your_very_secure_jwt_secret_key_here

# Application Configuration
APP_NAME="KD Academy Campus Connect"
APP_URL=http://localhost:8080
APP_ENV=development
```

### Step 3: Set Permissions
```bash
chmod 755 backend/
chmod 644 config/.env
```

## 📚 API Documentation

### Base URL
```
http://your-domain.com/api/
```

### Authentication Endpoints

#### POST /auth/login
Login with email and password.

**Request:**
```json
{
    "email": "user@kdacademy.edu.my",
    "password": "password123"
}
```

**Response:**
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "user": {
            "id": 1,
            "username": "john.doe",
            "email": "john.doe@kdacademy.edu.my",
            "first_name": "John",
            "last_name": "Doe",
            "role": "student"
        },
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
}
```

#### POST /auth/register
Register a new user.

**Request:**
```json
{
    "username": "newuser",
    "email": "newuser@kdacademy.edu.my",
    "password": "password123",
    "first_name": "New",
    "last_name": "User",
    "role": "student"
}
```

#### GET /auth/verify
Verify JWT token (include in Authorization header).

**Headers:**
```
Authorization: Bearer your_jwt_token_here
```

### User Management Endpoints

#### GET /users
Get all users with optional filtering.

**Query Parameters:**
- `role`: Filter by user role (student, faculty, admin)
- `search`: Search by name or email
- `page`: Page number for pagination
- `limit`: Number of records per page

#### GET /users/{id}
Get user by ID.

#### POST /users
Create new user.

#### PUT /users/{id}
Update user information.

#### DELETE /users/{id}
Soft delete user.

### Course Management Endpoints

#### GET /courses
Get all courses with optional filtering.

**Query Parameters:**
- `category`: Filter by course category
- `semester`: Filter by semester
- `search`: Search by title or description
- `page`: Page number for pagination
- `limit`: Number of records per page

#### GET /courses/{id}
Get course by ID.

#### POST /courses
Create new course.

#### PUT /courses/{id}
Update course information.

#### POST /courses/{id}/enroll
Enroll student in course.

**Request:**
```json
{
    "student_id": 1
}
```

### Attendance Endpoints

#### GET /attendance
Get attendance records with filtering.

**Query Parameters:**
- `student_id`: Filter by student
- `course_id`: Filter by course
- `status`: Filter by status (present, absent, late, excused)
- `date`: Filter by specific date
- `date_from`: Filter from date
- `date_to`: Filter to date

#### POST /attendance
Create attendance record.

**Request:**
```json
{
    "student_id": 1,
    "course_id": 1,
    "date": "2024-01-15",
    "status": "present",
    "notes": "On time"
}
```

### Performance Endpoints

#### GET /performance
Get performance records.

#### GET /performance/{id}
Get performance record by ID.

#### POST /performance
Create performance record.

### Community Endpoints

#### GET /community/posts
Get all community posts.

#### GET /community/posts/{id}
Get post by ID.

#### POST /community/posts
Create new post.

**Request:**
```json
{
    "author_id": 1,
    "content": "Hello community!",
    "tags": ["general", "hello"]
}
```

#### POST /community/posts/{id}/like
Like/unlike a post.

**Request:**
```json
{
    "user_id": 1
}
```

### Event Endpoints

#### GET /events
Get all events.

#### GET /events/{id}
Get event by ID.

#### POST /events
Create new event.

#### POST /events/{id}/register
Register for event.

**Request:**
```json
{
    "user_id": 1
}
```

## 🔐 Authentication

### JWT Token Structure
The system uses JWT tokens for authentication with the following structure:

```json
{
    "user_id": 1,
    "email": "user@kdacademy.edu.my",
    "role": "student",
    "iat": 1642234567,
    "exp": 1642839367
}
```

### Token Usage
Include the JWT token in the Authorization header for protected endpoints:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...
```

### Token Expiration
Tokens expire after 7 days. Users need to re-authenticate after expiration.

## 💡 Usage Examples

### Frontend Integration (JavaScript)

#### Login Example
```javascript
const login = async (email, password) => {
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user));
            return data.data;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
};
```

#### API Request with Authentication
```javascript
const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        },
        ...options
    };
    
    const response = await fetch(`/api/${endpoint}`, config);
    return response.json();
};

// Example usage
const getCourses = async () => {
    return await apiRequest('courses');
};

const enrollInCourse = async (courseId, studentId) => {
    return await apiRequest(`courses/${courseId}/enroll`, {
        method: 'POST',
        body: JSON.stringify({ student_id: studentId })
    });
};
```

### cURL Examples

#### Login
```bash
curl -X POST http://localhost/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@kdacademy.edu.my","password":"password"}'
```

#### Get Courses (with authentication)
```bash
curl -X GET http://localhost/api/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

#### Create Course
```bash
curl -X POST http://localhost/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "course_code": "CS101",
    "title": "Introduction to Computer Science",
    "description": "Basic computer science concepts",
    "instructor_id": 1,
    "semester": "Fall",
    "academic_year": "2024",
    "start_date": "2024-09-01",
    "end_date": "2024-12-15",
    "schedule": "Mon, Wed, Fri 10:00 AM - 11:30 AM"
  }'
```

## 📁 File Structure

```
backend/
├── api/
│   └── index.php              # Main API entry point
├── config/
│   ├── database.php           # Database configuration
│   ├── .env                   # Environment variables
│   └── env.example            # Environment template
├── database/
│   └── schema.sql             # Database schema
├── models/
│   ├── User.php               # User model
│   ├── Course.php             # Course model
│   ├── Attendance.php         # Attendance model
│   ├── Performance.php        # Performance model
│   ├── Community.php          # Community model
│   └── Event.php              # Event model
├── utils/
│   ├── Response.php           # Response utility
│   └── Auth.php               # Authentication utility
└── README.md                  # This file
```

## 🚀 Deployment

### Production Deployment

#### 1. Server Requirements
- PHP 8.0+
- MySQL 8.0+
- Apache/Nginx
- SSL certificate (recommended)

#### 2. Security Considerations
- Use HTTPS in production
- Set strong JWT secret
- Configure proper file permissions
- Enable error logging
- Set up database backups

#### 3. Environment Configuration
```env
APP_ENV=production
APP_URL=https://api.kdacademy.edu.my
JWT_SECRET=your_production_jwt_secret
DB_HOST=your_db_host
DB_NAME=your_db_name
DB_USER=your_db_user
DB_PASS=your_secure_password
```

#### 4. Performance Optimization
- Enable PHP OPcache
- Configure MySQL query cache
- Use CDN for static assets
- Implement API rate limiting

### Docker Deployment (Optional)

Create a `Dockerfile`:
```dockerfile
FROM php:8.0-apache

# Install extensions
RUN docker-php-ext-install pdo pdo_mysql

# Copy application
COPY . /var/www/html/

# Set permissions
RUN chown -R www-data:www-data /var/www/html/

# Enable mod_rewrite
RUN a2enmod rewrite

EXPOSE 80
```

## 🧪 Testing

### API Testing with Postman

1. Import the API collection
2. Set up environment variables
3. Test authentication endpoints first
4. Use the returned token for other requests

### Automated Testing

Create test files in a `tests/` directory:
```php
<?php
// tests/AuthTest.php
class AuthTest {
    public function testLogin() {
        // Test login functionality
    }
    
    public function testRegister() {
        // Test registration functionality
    }
}
```

## 📞 Support

For technical support and questions:
- Email: support@kdacademy.edu.my
- Documentation: https://docs.kdacademy.edu.my
- GitHub Issues: https://github.com/yourusername/kda-campusconnect/issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for KD Academy**
