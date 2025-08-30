<?php
/**
 * Attendance Model Class
 * Handles attendance-related database operations
 */

require_once '../utils/Response.php';

class Attendance {
    private $db;
    private $response;
    private $table = 'attendance_records';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all attendance records with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT ar.*, u.first_name, u.last_name, u.email, c.title as course_title, c.course_code
                    FROM {$this->table} ar
                    JOIN users u ON ar.student_id = u.id
                    JOIN courses c ON ar.course_id = c.id
                    WHERE 1=1";
            $params = [];

            // Apply filters
            if (isset($filters['student_id'])) {
                $sql .= " AND ar.student_id = ?";
                $params[] = $filters['student_id'];
            }

            if (isset($filters['course_id'])) {
                $sql .= " AND ar.course_id = ?";
                $params[] = $filters['course_id'];
            }

            if (isset($filters['status'])) {
                $sql .= " AND ar.status = ?";
                $params[] = $filters['status'];
            }

            if (isset($filters['date'])) {
                $sql .= " AND ar.date = ?";
                $params[] = $filters['date'];
            }

            if (isset($filters['date_from'])) {
                $sql .= " AND ar.date >= ?";
                $params[] = $filters['date_from'];
            }

            if (isset($filters['date_to'])) {
                $sql .= " AND ar.date <= ?";
                $params[] = $filters['date_to'];
            }

            $sql .= " ORDER BY ar.date DESC, ar.created_at DESC";

            // Apply pagination
            $page = $filters['page'] ?? 1;
            $limit = $filters['limit'] ?? 10;
            $offset = ($page - 1) * $limit;

            $sql .= " LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Attendance records retrieved successfully', $records);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve attendance records', $e->getMessage(), 500);
        }
    }

    /**
     * Get attendance record by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT ar.*, u.first_name, u.last_name, u.email, c.title as course_title, c.course_code
                FROM {$this->table} ar
                JOIN users u ON ar.student_id = u.id
                JOIN courses c ON ar.course_id = c.id
                WHERE ar.id = ?
            ");
            $stmt->execute([$id]);
            $record = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$record) {
                return $this->response->error('Attendance record not found', 'Record with this ID does not exist', 404);
            }

            return $this->response->success('Attendance record retrieved successfully', $record);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve attendance record', $e->getMessage(), 500);
        }
    }

    /**
     * Create new attendance record
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['student_id', 'course_id', 'date', 'status'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Check if record already exists for this student, course, and date
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE student_id = ? AND course_id = ? AND date = ?");
            $stmt->execute([$data['student_id'], $data['course_id'], $data['date']]);
            
            if ($stmt->fetch()) {
                return $this->response->error('Record already exists', 'Attendance record for this student, course, and date already exists', 409);
            }

            // Insert new record
            $stmt = $this->db->prepare("
                INSERT INTO {$this->table} (student_id, course_id, date, status, notes, recorded_by) 
                VALUES (?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['student_id'],
                $data['course_id'],
                $data['date'],
                $data['status'],
                $data['notes'] ?? null,
                $data['recorded_by'] ?? 1 // Default to admin user
            ]);

            $record_id = $this->db->lastInsertId();
            return $this->getById($record_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create attendance record', $e->getMessage(), 500);
        }
    }

    /**
     * Update attendance record
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if record exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Attendance record not found', 'Record with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['status', 'notes'];
            
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
            return $this->response->error('Failed to update attendance record', $e->getMessage(), 500);
        }
    }

    /**
     * Delete attendance record
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if record exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Attendance record not found', 'Record with this ID does not exist', 404);
            }

            // Delete record
            $stmt = $this->db->prepare("DELETE FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('Attendance record deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete attendance record', $e->getMessage(), 500);
        }
    }

    /**
     * Get attendance statistics for a student
     * @param int $student_id
     * @param array $filters
     * @return array
     */
    public function getStudentStats($student_id, $filters = []) {
        try {
            $sql = "SELECT 
                        COUNT(*) as total_classes,
                        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_count,
                        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_count,
                        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late_count,
                        SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) as excused_count,
                        ROUND((SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as attendance_percentage
                    FROM {$this->table} 
                    WHERE student_id = ?";
            $params = [$student_id];

            if (isset($filters['course_id'])) {
                $sql .= " AND course_id = ?";
                $params[] = $filters['course_id'];
            }

            if (isset($filters['date_from'])) {
                $sql .= " AND date >= ?";
                $params[] = $filters['date_from'];
            }

            if (isset($filters['date_to'])) {
                $sql .= " AND date <= ?";
                $params[] = $filters['date_to'];
            }

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);

            return $this->response->success('Attendance statistics retrieved successfully', $stats);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve attendance statistics', $e->getMessage(), 500);
        }
    }

    /**
     * Get attendance statistics for a course
     * @param int $course_id
     * @param string $date
     * @return array
     */
    public function getCourseStats($course_id, $date = null) {
        try {
            $sql = "SELECT 
                        COUNT(*) as total_students,
                        SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) as present_count,
                        SUM(CASE WHEN status = 'absent' THEN 1 ELSE 0 END) as absent_count,
                        SUM(CASE WHEN status = 'late' THEN 1 ELSE 0 END) as late_count,
                        SUM(CASE WHEN status = 'excused' THEN 1 ELSE 0 END) as excused_count,
                        ROUND((SUM(CASE WHEN status = 'present' THEN 1 ELSE 0 END) / COUNT(*)) * 100, 2) as attendance_percentage
                    FROM {$this->table} 
                    WHERE course_id = ?";
            $params = [$course_id];

            if ($date) {
                $sql .= " AND date = ?";
                $params[] = $date;
            }

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $stats = $stmt->fetch(PDO::FETCH_ASSOC);

            return $this->response->success('Course attendance statistics retrieved successfully', $stats);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve course attendance statistics', $e->getMessage(), 500);
        }
    }
}
?>
