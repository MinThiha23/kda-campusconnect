<?php
/**
 * User Model Class
 * Handles user-related database operations
 */

require_once '../utils/Response.php';

class User {
    private $db;
    private $response;
    private $table = 'users';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all users with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT * FROM {$this->table} WHERE is_active = 1";
            $params = [];

            // Apply filters
            if (isset($filters['role'])) {
                $sql .= " AND role = ?";
                $params[] = $filters['role'];
            }

            if (isset($filters['search'])) {
                $sql .= " AND (first_name LIKE ? OR last_name LIKE ? OR email LIKE ?)";
                $search = "%{$filters['search']}%";
                $params[] = $search;
                $params[] = $search;
                $params[] = $search;
            }

            $sql .= " ORDER BY created_at DESC";

            // Apply pagination
            $page = $filters['page'] ?? 1;
            $limit = $filters['limit'] ?? 10;
            $offset = ($page - 1) * $limit;

            $sql .= " LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get total count for pagination
            $count_sql = "SELECT COUNT(*) FROM {$this->table} WHERE is_active = 1";
            $count_stmt = $this->db->prepare($count_sql);
            $count_stmt->execute();
            $total = $count_stmt->fetchColumn();

            // Remove sensitive data
            foreach ($users as &$user) {
                unset($user['password_hash']);
            }

            return $this->response->paginated('Users retrieved successfully', $users, $page, $limit, $total);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve users', $e->getMessage(), 500);
        }
    }

    /**
     * Get user by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return $this->response->error('User not found', 'User with this ID does not exist', 404);
            }

            // Remove sensitive data
            unset($user['password_hash']);

            return $this->response->success('User retrieved successfully', $user);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve user', $e->getMessage(), 500);
        }
    }

    /**
     * Create new user
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['username', 'email', 'password', 'first_name', 'last_name'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Check if user already exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE email = ? OR username = ?");
            $stmt->execute([$data['email'], $data['username']]);
            
            if ($stmt->fetch()) {
                return $this->response->error('User already exists', 'Email or username is already taken', 409);
            }

            // Hash password
            $password_hash = password_hash($data['password'], PASSWORD_DEFAULT);

            // Prepare insert statement
            $fields = ['username', 'email', 'password_hash', 'first_name', 'last_name', 'role', 'phone', 'address', 'date_of_birth', 'gender'];
            $placeholders = str_repeat('?,', count($fields) - 1) . '?';
            
            $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ") VALUES ($placeholders)";
            
            $values = [
                $data['username'],
                $data['email'],
                $password_hash,
                $data['first_name'],
                $data['last_name'],
                $data['role'] ?? 'student',
                $data['phone'] ?? null,
                $data['address'] ?? null,
                $data['date_of_birth'] ?? null,
                $data['gender'] ?? null
            ];

            $stmt = $this->db->prepare($sql);
            $stmt->execute($values);
            
            $user_id = $this->db->lastInsertId();

            // Get the created user
            return $this->getById($user_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create user', $e->getMessage(), 500);
        }
    }

    /**
     * Update user
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if user exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('User not found', 'User with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['first_name', 'last_name', 'phone', 'address', 'date_of_birth', 'gender', 'avatar'];
            
            foreach ($allowed_fields as $field) {
                if (isset($data[$field])) {
                    $update_fields[] = "$field = ?";
                    $values[] = $data[$field];
                }
            }

            if (empty($update_fields)) {
                return $this->response->error('No valid fields to update', 'Please provide at least one valid field', 400);
            }

            $values[] = $id;
            $sql = "UPDATE {$this->table} SET " . implode(', ', $update_fields) . ", updated_at = CURRENT_TIMESTAMP WHERE id = ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($values);

            return $this->getById($id);

        } catch (Exception $e) {
            return $this->response->error('Failed to update user', $e->getMessage(), 500);
        }
    }

    /**
     * Delete user (soft delete)
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if user exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('User not found', 'User with this ID does not exist', 404);
            }

            // Soft delete
            $stmt = $this->db->prepare("UPDATE {$this->table} SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('User deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete user', $e->getMessage(), 500);
        }
    }

    /**
     * Get user profile with additional information
     * @param int $id
     * @return array
     */
    public function getProfile($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT u.*, 
                       sp.student_id, sp.enrollment_date, sp.graduation_date, sp.major, sp.minor, sp.gpa, sp.credits_earned, sp.academic_status,
                       fp.employee_id, fp.department, fp.position, fp.hire_date, fp.office_location, fp.office_hours, fp.specialization
                FROM {$this->table} u
                LEFT JOIN student_profiles sp ON u.id = sp.user_id
                LEFT JOIN faculty_profiles fp ON u.id = fp.user_id
                WHERE u.id = ? AND u.is_active = 1
            ");
            
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return $this->response->error('User not found', 'User with this ID does not exist', 404);
            }

            // Remove sensitive data
            unset($user['password_hash']);

            return $this->response->success('User profile retrieved successfully', $user);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve user profile', $e->getMessage(), 500);
        }
    }

    /**
     * Update user password
     * @param int $id
     * @param string $current_password
     * @param string $new_password
     * @return array
     */
    public function updatePassword($id, $current_password, $new_password) {
        try {
            // Get current user
            $stmt = $this->db->prepare("SELECT password_hash FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$user) {
                return $this->response->error('User not found', 'User with this ID does not exist', 404);
            }

            // Verify current password
            if (!password_verify($current_password, $user['password_hash'])) {
                return $this->response->error('Invalid password', 'Current password is incorrect', 400);
            }

            // Hash new password
            $new_password_hash = password_hash($new_password, PASSWORD_DEFAULT);

            // Update password
            $stmt = $this->db->prepare("UPDATE {$this->table} SET password_hash = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$new_password_hash, $id]);

            return $this->response->success('Password updated successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to update password', $e->getMessage(), 500);
        }
    }

    /**
     * Get users by role
     * @param string $role
     * @return array
     */
    public function getByRole($role) {
        try {
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE role = ? AND is_active = 1 ORDER BY first_name, last_name");
            $stmt->execute([$role]);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Remove sensitive data
            foreach ($users as &$user) {
                unset($user['password_hash']);
            }

            return $this->response->success('Users retrieved successfully', $users);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve users', $e->getMessage(), 500);
        }
    }
}
?>
