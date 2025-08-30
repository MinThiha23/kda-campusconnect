<?php
/**
 * Course Model Class
 * Handles course-related database operations
 */

require_once '../utils/Response.php';

class Course {
    private $db;
    private $response;
    private $table = 'courses';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all courses with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT c.*, u.first_name, u.last_name as instructor_name 
                    FROM {$this->table} c 
                    LEFT JOIN users u ON c.instructor_id = u.id 
                    WHERE c.is_active = 1";
            $params = [];

            // Apply filters
            if (isset($filters['category'])) {
                $sql .= " AND c.category = ?";
                $params[] = $filters['category'];
            }

            if (isset($filters['semester'])) {
                $sql .= " AND c.semester = ?";
                $params[] = $filters['semester'];
            }

            if (isset($filters['academic_year'])) {
                $sql .= " AND c.academic_year = ?";
                $params[] = $filters['academic_year'];
            }

            if (isset($filters['search'])) {
                $sql .= " AND (c.title LIKE ? OR c.description LIKE ? OR c.course_code LIKE ?)";
                $search = "%{$filters['search']}%";
                $params[] = $search;
                $params[] = $search;
                $params[] = $search;
            }

            $sql .= " ORDER BY c.created_at DESC";

            // Apply pagination
            $page = $filters['page'] ?? 1;
            $limit = $filters['limit'] ?? 10;
            $offset = ($page - 1) * $limit;

            $sql .= " LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Get total count for pagination
            $count_sql = "SELECT COUNT(*) FROM {$this->table} WHERE is_active = 1";
            $count_stmt = $this->db->prepare($count_sql);
            $count_stmt->execute();
            $total = $count_stmt->fetchColumn();

            return $this->response->paginated('Courses retrieved successfully', $courses, $page, $limit, $total);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve courses', $e->getMessage(), 500);
        }
    }

    /**
     * Get course by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT c.*, u.first_name, u.last_name as instructor_name 
                FROM {$this->table} c 
                LEFT JOIN users u ON c.instructor_id = u.id 
                WHERE c.id = ? AND c.is_active = 1
            ");
            $stmt->execute([$id]);
            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$course) {
                return $this->response->error('Course not found', 'Course with this ID does not exist', 404);
            }

            return $this->response->success('Course retrieved successfully', $course);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve course', $e->getMessage(), 500);
        }
    }

    /**
     * Create new course
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['course_code', 'title', 'instructor_id', 'semester', 'academic_year', 'start_date', 'end_date', 'schedule'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Check if course code already exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE course_code = ? AND is_active = 1");
            $stmt->execute([$data['course_code']]);
            
            if ($stmt->fetch()) {
                return $this->response->error('Course already exists', 'Course code is already taken', 409);
            }

            // Prepare insert statement
            $fields = ['course_code', 'title', 'description', 'credits', 'category', 'instructor_id', 'max_students', 'semester', 'academic_year', 'start_date', 'end_date', 'schedule', 'location'];
            $placeholders = str_repeat('?,', count($fields) - 1) . '?';
            
            $sql = "INSERT INTO {$this->table} (" . implode(', ', $fields) . ") VALUES ($placeholders)";
            
            $values = [
                $data['course_code'],
                $data['title'],
                $data['description'] ?? null,
                $data['credits'] ?? 3,
                $data['category'] ?? 'Other',
                $data['instructor_id'],
                $data['max_students'] ?? 30,
                $data['semester'],
                $data['academic_year'],
                $data['start_date'],
                $data['end_date'],
                $data['schedule'],
                $data['location'] ?? null
            ];

            $stmt = $this->db->prepare($sql);
            $stmt->execute($values);
            
            $course_id = $this->db->lastInsertId();

            return $this->getById($course_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create course', $e->getMessage(), 500);
        }
    }

    /**
     * Update course
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if course exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Course not found', 'Course with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['title', 'description', 'credits', 'category', 'instructor_id', 'max_students', 'semester', 'academic_year', 'start_date', 'end_date', 'schedule', 'location'];
            
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
            return $this->response->error('Failed to update course', $e->getMessage(), 500);
        }
    }

    /**
     * Delete course (soft delete)
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if course exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Course not found', 'Course with this ID does not exist', 404);
            }

            // Soft delete
            $stmt = $this->db->prepare("UPDATE {$this->table} SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('Course deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete course', $e->getMessage(), 500);
        }
    }

    /**
     * Enroll student in course
     * @param int $course_id
     * @param array $data
     * @return array
     */
    public function enrollStudent($course_id, $data) {
        if (!isset($data['student_id'])) {
            return $this->response->error('Missing student ID', 'Student ID is required', 400);
        }

        try {
            // Check if course exists and has available seats
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = ? AND is_active = 1");
            $stmt->execute([$course_id]);
            $course = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$course) {
                return $this->response->error('Course not found', 'Course with this ID does not exist', 404);
            }

            if ($course['current_students'] >= $course['max_students']) {
                return $this->response->error('Course full', 'This course has reached maximum capacity', 400);
            }

            // Check if student is already enrolled
            $stmt = $this->db->prepare("SELECT id FROM course_enrollments WHERE student_id = ? AND course_id = ? AND status = 'enrolled'");
            $stmt->execute([$data['student_id'], $course_id]);
            
            if ($stmt->fetch()) {
                return $this->response->error('Already enrolled', 'Student is already enrolled in this course', 409);
            }

            // Begin transaction
            $this->db->beginTransaction();

            // Create enrollment
            $stmt = $this->db->prepare("
                INSERT INTO course_enrollments (student_id, course_id, status) 
                VALUES (?, ?, 'enrolled')
            ");
            $stmt->execute([$data['student_id'], $course_id]);

            // Update course student count
            $stmt = $this->db->prepare("
                UPDATE {$this->table} 
                SET current_students = current_students + 1, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            ");
            $stmt->execute([$course_id]);

            $this->db->commit();

            return $this->response->success('Student enrolled successfully', null);

        } catch (Exception $e) {
            $this->db->rollBack();
            return $this->response->error('Failed to enroll student', $e->getMessage(), 500);
        }
    }

    /**
     * Get enrolled students for a course
     * @param int $course_id
     * @return array
     */
    public function getEnrolledStudents($course_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT u.id, u.first_name, u.last_name, u.email, u.avatar,
                       ce.enrollment_date, ce.status, ce.grade, ce.final_score
                FROM course_enrollments ce
                JOIN users u ON ce.student_id = u.id
                WHERE ce.course_id = ? AND ce.status = 'enrolled'
                ORDER BY u.first_name, u.last_name
            ");
            $stmt->execute([$course_id]);
            $students = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Enrolled students retrieved successfully', $students);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve enrolled students', $e->getMessage(), 500);
        }
    }

    /**
     * Get courses by instructor
     * @param int $instructor_id
     * @return array
     */
    public function getByInstructor($instructor_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT * FROM {$this->table} 
                WHERE instructor_id = ? AND is_active = 1 
                ORDER BY semester DESC, academic_year DESC
            ");
            $stmt->execute([$instructor_id]);
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Instructor courses retrieved successfully', $courses);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve instructor courses', $e->getMessage(), 500);
        }
    }

    /**
     * Get courses by category
     * @param string $category
     * @return array
     */
    public function getByCategory($category) {
        try {
            $stmt = $this->db->prepare("
                SELECT c.*, u.first_name, u.last_name as instructor_name 
                FROM {$this->table} c 
                LEFT JOIN users u ON c.instructor_id = u.id 
                WHERE c.category = ? AND c.is_active = 1 
                ORDER BY c.created_at DESC
            ");
            $stmt->execute([$category]);
            $courses = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Courses retrieved successfully', $courses);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve courses', $e->getMessage(), 500);
        }
    }
}
?>
