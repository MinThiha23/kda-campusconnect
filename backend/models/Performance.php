<?php
/**
 * Performance Model Class
 * Handles performance-related database operations
 */

require_once '../utils/Response.php';

class Performance {
    private $db;
    private $response;

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all performance records with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT ce.*, u.first_name, u.last_name, u.email, c.title as course_title, c.course_code
                    FROM course_enrollments ce
                    JOIN users u ON ce.student_id = u.id
                    JOIN courses c ON ce.course_id = c.id
                    WHERE 1=1";
            $params = [];

            // Apply filters
            if (isset($filters['student_id'])) {
                $sql .= " AND ce.student_id = ?";
                $params[] = $filters['student_id'];
            }

            if (isset($filters['course_id'])) {
                $sql .= " AND ce.course_id = ?";
                $params[] = $filters['course_id'];
            }

            if (isset($filters['status'])) {
                $sql .= " AND ce.status = ?";
                $params[] = $filters['status'];
            }

            $sql .= " ORDER BY ce.updated_at DESC";

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Performance records retrieved successfully', $records);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve performance records', $e->getMessage(), 500);
        }
    }

    /**
     * Get performance record by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT ce.*, u.first_name, u.last_name, u.email, c.title as course_title, c.course_code
                FROM course_enrollments ce
                JOIN users u ON ce.student_id = u.id
                JOIN courses c ON ce.course_id = c.id
                WHERE ce.id = ?
            ");
            $stmt->execute([$id]);
            $record = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$record) {
                return $this->response->error('Performance record not found', 'Record with this ID does not exist', 404);
            }

            return $this->response->success('Performance record retrieved successfully', $record);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve performance record', $e->getMessage(), 500);
        }
    }

    /**
     * Create new performance record
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['student_id', 'course_id'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Check if record already exists
            $stmt = $this->db->prepare("SELECT id FROM course_enrollments WHERE student_id = ? AND course_id = ?");
            $stmt->execute([$data['student_id'], $data['course_id']]);
            
            if ($stmt->fetch()) {
                return $this->response->error('Record already exists', 'Performance record for this student and course already exists', 409);
            }

            // Insert new record
            $stmt = $this->db->prepare("
                INSERT INTO course_enrollments (student_id, course_id, status, grade, final_score) 
                VALUES (?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['student_id'],
                $data['course_id'],
                $data['status'] ?? 'enrolled',
                $data['grade'] ?? null,
                $data['final_score'] ?? null
            ]);

            $record_id = $this->db->lastInsertId();
            return $this->getById($record_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create performance record', $e->getMessage(), 500);
        }
    }

    /**
     * Update performance record
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if record exists
            $stmt = $this->db->prepare("SELECT id FROM course_enrollments WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Performance record not found', 'Record with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['status', 'grade', 'final_score'];
            
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
            $sql = "UPDATE course_enrollments SET " . implode(', ', $update_fields) . ", updated_at = CURRENT_TIMESTAMP WHERE id = ?";
            
            $stmt = $this->db->prepare($sql);
            $stmt->execute($values);

            return $this->getById($id);

        } catch (Exception $e) {
            return $this->response->error('Failed to update performance record', $e->getMessage(), 500);
        }
    }

    /**
     * Delete performance record
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if record exists
            $stmt = $this->db->prepare("SELECT id FROM course_enrollments WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Performance record not found', 'Record with this ID does not exist', 404);
            }

            // Delete record
            $stmt = $this->db->prepare("DELETE FROM course_enrollments WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('Performance record deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete performance record', $e->getMessage(), 500);
        }
    }

    /**
     * Get student performance statistics
     * @param int $student_id
     * @return array
     */
    public function getStudentStats($student_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT 
                    COUNT(*) as total_courses,
                    SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completed_courses,
                    AVG(final_score) as average_score,
                    MAX(final_score) as highest_score,
                    MIN(final_score) as lowest_score
                FROM course_enrollments 
                WHERE student_id = ? AND final_score IS NOT NULL
            ");
            $stmt->execute([$student_id]);
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);

            return $this->response->success('Student performance statistics retrieved successfully', $stats);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve student performance statistics', $e->getMessage(), 500);
        }
    }
}
?>
