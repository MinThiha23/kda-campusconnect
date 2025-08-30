<?php
/**
 * Authentication Utility Class
 * Handles JWT tokens, login, registration, and token verification
 */

require_once 'Response.php';

class Auth {
    private $db;
    private $response;
    private $jwt_secret;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
        
        // Get JWT secret from environment or use default
        $this->jwt_secret = getenv('JWT_SECRET') ?: 'your_jwt_secret_key_here';
    }

    /**
     * User login
     * @param array $data
     * @return array
     */
    public function login($data) {
        if (!isset($data['email']) || !isset($data['password'])) {
            return $this->response->error('Missing credentials', 'Email and password are required', 400);
        }

        $email = $data['email'];
        $password = $data['password'];

        try {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ? AND is_active = 1");
            $stmt->execute([$email]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user || !password_verify($password, $user['password_hash'])) {
                return $this->response->error('Invalid credentials', 'Email or password is incorrect', 401);
            }

            // Generate JWT token
            $token = $this->generateJWT($user);

            // Remove password from user data
            unset($user['password_hash']);

            return $this->response->success('Login successful', [
                'user' => $user,
                'token' => $token
            ]);

        } catch (Exception $e) {
            return $this->response->error('Login failed', $e->getMessage(), 500);
        }
    }

    /**
     * User registration
     * @param array $data
     * @return array
     */
    public function register($data) {
        $required_fields = ['username', 'email', 'password', 'first_name', 'last_name'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        $username = $data['username'];
        $email = $data['email'];
        $password = $data['password'];
        $first_name = $data['first_name'];
        $last_name = $data['last_name'];
        $role = $data['role'] ?? 'student';

        // Validate email format
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            return $this->response->error('Invalid email', 'Please provide a valid email address', 400);
        }

        // Check if user already exists
        try {
            $stmt = $this->db->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
            $stmt->execute([$email, $username]);
            
            if ($stmt->fetch()) {
                return $this->response->error('User already exists', 'Email or username is already taken', 409);
            }

            // Hash password
            $password_hash = password_hash($password, PASSWORD_DEFAULT);

            // Insert new user
            $stmt = $this->db->prepare("
                INSERT INTO users (username, email, password_hash, first_name, last_name, role) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([$username, $email, $password_hash, $first_name, $last_name, $role]);
            $user_id = $this->db->lastInsertId();

            // Get the created user
            $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ?");
            $stmt->execute([$user_id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            // Generate JWT token
            $token = $this->generateJWT($user);

            // Remove password from user data
            unset($user['password_hash']);

            return $this->response->success('Registration successful', [
                'user' => $user,
                'token' => $token
            ], 201);

        } catch (Exception $e) {
            return $this->response->error('Registration failed', $e->getMessage(), 500);
        }
    }

    /**
     * Verify JWT token
     * @return array
     */
    public function verifyToken() {
        $headers = getallheaders();
        $auth_header = $headers['Authorization'] ?? $headers['authorization'] ?? '';

        if (empty($auth_header) || !preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
            return $this->response->error('No token provided', 'Authorization header is required', 401);
        }

        $token = $matches[1];

        try {
            $payload = $this->decodeJWT($token);
            
            if (!$payload) {
                return $this->response->error('Invalid token', 'Token is invalid or expired', 401);
            }

            // Get user data
            $stmt = $this->db->prepare("SELECT * FROM users WHERE id = ? AND is_active = 1");
            $stmt->execute([$payload['user_id']]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return $this->response->error('User not found', 'User account not found or inactive', 401);
            }

            // Remove password from user data
            unset($user['password_hash']);

            return $this->response->success('Token verified', [
                'user' => $user,
                'token' => $token
            ]);

        } catch (Exception $e) {
            return $this->response->error('Token verification failed', $e->getMessage(), 401);
        }
    }

    /**
     * Logout user
     * @return array
     */
    public function logout() {
        // In a stateless JWT system, logout is handled client-side
        // You could implement a blacklist for tokens if needed
        return $this->response->success('Logout successful', null);
    }

    /**
     * Generate JWT token
     * @param array $user
     * @return string
     */
    private function generateJWT($user) {
        $header = json_encode(['typ' => 'JWT', 'alg' => 'HS256']);
        $payload = json_encode([
            'user_id' => $user['id'],
            'email' => $user['email'],
            'role' => $user['role'],
            'iat' => time(),
            'exp' => time() + (60 * 60 * 24 * 7) // 7 days
        ]);

        $base64_header = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($header));
        $base64_payload = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($payload));

        $signature = hash_hmac('sha256', $base64_header . "." . $base64_payload, $this->jwt_secret, true);
        $base64_signature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($signature));

        return $base64_header . "." . $base64_payload . "." . $base64_signature;
    }

    /**
     * Decode JWT token
     * @param string $token
     * @return array|false
     */
    private function decodeJWT($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return false;
        }

        $header = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[0]));
        $payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[1]));
        $signature = base64_decode(str_replace(['-', '_'], ['+', '/'], $parts[2]));

        $expected_signature = hash_hmac('sha256', $parts[0] . "." . $parts[1], $this->jwt_secret, true);

        if (!hash_equals($signature, $expected_signature)) {
            return false;
        }

        $payload_data = json_decode($payload, true);

        // Check if token is expired
        if (isset($payload_data['exp']) && $payload_data['exp'] < time()) {
            return false;
        }

        return $payload_data;
    }

    /**
     * Get current user from token
     * @return array|false
     */
    public function getCurrentUser() {
        $result = $this->verifyToken();
        
        if ($result['success']) {
            return $result['data']['user'];
        }
        
        return false;
    }
}
?>
