<?php
/**
 * KD Academy Campus Connect API
 * Main entry point for all API requests
 */

// Enable error reporting for development
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set headers for CORS and JSON responses
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include necessary files
require_once '../config/database.php';
require_once '../utils/Response.php';
require_once '../utils/Auth.php';
require_once '../models/User.php';
require_once '../models/Course.php';
require_once '../models/Attendance.php';
require_once '../models/Performance.php';
require_once '../models/Community.php';
require_once '../models/Event.php';

// Initialize response handler
$response = new Response();

try {
    // Get request method and path
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $path = str_replace('/api/', '', $path);
    $path = trim($path, '/');
    
    // Get request body for POST/PUT requests
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Route the request
    $result = routeRequest($method, $path, $input);
    
    // Send response
    echo json_encode($result);
    
} catch (Exception $e) {
    $response->error('Internal Server Error', $e->getMessage(), 500);
    echo json_encode($response->getResponse());
}

/**
 * Route requests to appropriate handlers
 */
function routeRequest($method, $path, $input) {
    $response = new Response();
    
    // Split path into segments
    $segments = explode('/', $path);
    $resource = $segments[0] ?? '';
    $id = $segments[1] ?? null;
    $action = $segments[2] ?? null;
    
    // Authentication routes
    if ($resource === 'auth') {
        $auth = new Auth();
        
        switch ($action) {
            case 'login':
                if ($method === 'POST') {
                    return $auth->login($input);
                }
                break;
                
            case 'register':
                if ($method === 'POST') {
                    return $auth->register($input);
                }
                break;
                
            case 'logout':
                if ($method === 'POST') {
                    return $auth->logout();
                }
                break;
                
            case 'verify':
                if ($method === 'GET') {
                    return $auth->verifyToken();
                }
                break;
                
            default:
                return $response->error('Not Found', 'Authentication endpoint not found', 404);
        }
    }
    
    // Check authentication for protected routes
    if (!in_array($resource, ['auth', 'health'])) {
        $auth = new Auth();
        $authResult = $auth->verifyToken();
        
        if (!$authResult['success']) {
            return $response->error('Unauthorized', 'Authentication required', 401);
        }
    }
    
    // Route to appropriate resource handler
    switch ($resource) {
        case 'users':
            $user = new User();
            return handleUserRequests($user, $method, $id, $action, $input);
            
        case 'courses':
            $course = new Course();
            return handleCourseRequests($course, $method, $id, $action, $input);
            
        case 'attendance':
            $attendance = new Attendance();
            return handleAttendanceRequests($attendance, $method, $id, $action, $input);
            
        case 'performance':
            $performance = new Performance();
            return handlePerformanceRequests($performance, $method, $id, $action, $input);
            
        case 'community':
            $community = new Community();
            return handleCommunityRequests($community, $method, $id, $action, $input);
            
        case 'events':
            $event = new Event();
            return handleEventRequests($event, $method, $id, $action, $input);
            
        case 'health':
            return $response->success('API is running', ['status' => 'healthy', 'timestamp' => date('Y-m-d H:i:s')]);
            
        default:
            return $response->error('Not Found', 'Resource not found', 404);
    }
}

/**
 * Handle user-related requests
 */
function handleUserRequests($user, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                return $user->getById($id);
            } else {
                return $user->getAll();
            }
            
        case 'POST':
            return $user->create($input);
            
        case 'PUT':
            if ($id) {
                return $user->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $user->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}

/**
 * Handle course-related requests
 */
function handleCourseRequests($course, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($action === 'enroll' && $id) {
                return $course->enrollStudent($id, $input);
            } elseif ($id) {
                return $course->getById($id);
            } else {
                return $course->getAll();
            }
            
        case 'POST':
            if ($action === 'enroll' && $id) {
                return $course->enrollStudent($id, $input);
            } else {
                return $course->create($input);
            }
            
        case 'PUT':
            if ($id) {
                return $course->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $course->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}

/**
 * Handle attendance-related requests
 */
function handleAttendanceRequests($attendance, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                return $attendance->getById($id);
            } else {
                return $attendance->getAll();
            }
            
        case 'POST':
            return $attendance->create($input);
            
        case 'PUT':
            if ($id) {
                return $attendance->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $attendance->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}

/**
 * Handle performance-related requests
 */
function handlePerformanceRequests($performance, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($id) {
                return $performance->getById($id);
            } else {
                return $performance->getAll();
            }
            
        case 'POST':
            return $performance->create($input);
            
        case 'PUT':
            if ($id) {
                return $performance->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $performance->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}

/**
 * Handle community-related requests
 */
function handleCommunityRequests($community, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($action === 'posts' && $id) {
                return $community->getPostById($id);
            } elseif ($action === 'posts') {
                return $community->getAllPosts();
            } elseif ($id) {
                return $community->getById($id);
            } else {
                return $community->getAll();
            }
            
        case 'POST':
            if ($action === 'posts') {
                return $community->createPost($input);
            } elseif ($action === 'like' && $id) {
                return $community->likePost($id, $input);
            } else {
                return $community->create($input);
            }
            
        case 'PUT':
            if ($id) {
                return $community->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $community->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}

/**
 * Handle event-related requests
 */
function handleEventRequests($event, $method, $id, $action, $input) {
    $response = new Response();
    
    switch ($method) {
        case 'GET':
            if ($action === 'register' && $id) {
                return $event->registerForEvent($id, $input);
            } elseif ($id) {
                return $event->getById($id);
            } else {
                return $event->getAll();
            }
            
        case 'POST':
            if ($action === 'register' && $id) {
                return $event->registerForEvent($id, $input);
            } else {
                return $event->create($input);
            }
            
        case 'PUT':
            if ($id) {
                return $event->update($id, $input);
            }
            break;
            
        case 'DELETE':
            if ($id) {
                return $event->delete($id);
            }
            break;
    }
    
    return $response->error('Method Not Allowed', 'HTTP method not supported', 405);
}
?>
