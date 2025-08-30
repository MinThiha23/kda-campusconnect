<?php
/**
 * Event Model Class
 * Handles event-related database operations
 */

require_once '../utils/Response.php';

class Event {
    private $db;
    private $response;
    private $table = 'events';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all events with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT e.*, u.first_name, u.last_name as organizer_name
                    FROM {$this->table} e
                    JOIN users u ON e.organizer_id = u.id
                    WHERE e.is_public = 1";
            $params = [];

            // Apply filters
            if (isset($filters['event_type'])) {
                $sql .= " AND e.event_type = ?";
                $params[] = $filters['event_type'];
            }

            if (isset($filters['organizer_id'])) {
                $sql .= " AND e.organizer_id = ?";
                $params[] = $filters['organizer_id'];
            }

            if (isset($filters['date_from'])) {
                $sql .= " AND e.event_date >= ?";
                $params[] = $filters['date_from'];
            }

            if (isset($filters['date_to'])) {
                $sql .= " AND e.event_date <= ?";
                $params[] = $filters['date_to'];
            }

            if (isset($filters['search'])) {
                $sql .= " AND (e.title LIKE ? OR e.description LIKE ?)";
                $search = "%{$filters['search']}%";
                $params[] = $search;
                $params[] = $search;
            }

            $sql .= " ORDER BY e.event_date ASC";

            // Apply pagination
            $page = $filters['page'] ?? 1;
            $limit = $filters['limit'] ?? 10;
            $offset = ($page - 1) * $limit;

            $sql .= " LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Events retrieved successfully', $events);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve events', $e->getMessage(), 500);
        }
    }

    /**
     * Get event by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT e.*, u.first_name, u.last_name as organizer_name
                FROM {$this->table} e
                JOIN users u ON e.organizer_id = u.id
                WHERE e.id = ? AND e.is_public = 1
            ");
            $stmt->execute([$id]);
            $event = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$event) {
                return $this->response->error('Event not found', 'Event with this ID does not exist', 404);
            }

            return $this->response->success('Event retrieved successfully', $event);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve event', $e->getMessage(), 500);
        }
    }

    /**
     * Create new event
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['title', 'event_date', 'organizer_id', 'event_type'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Insert new event
            $stmt = $this->db->prepare("
                INSERT INTO {$this->table} (title, description, event_date, location, organizer_id, max_attendees, event_type, is_public, registration_required) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $data['title'],
                $data['description'] ?? null,
                $data['event_date'],
                $data['location'] ?? null,
                $data['organizer_id'],
                $data['max_attendees'] ?? null,
                $data['event_type'],
                $data['is_public'] ?? true,
                $data['registration_required'] ?? false
            ]);

            $event_id = $this->db->lastInsertId();
            return $this->getById($event_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create event', $e->getMessage(), 500);
        }
    }

    /**
     * Update event
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if event exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Event not found', 'Event with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['title', 'description', 'event_date', 'location', 'max_attendees', 'event_type', 'is_public', 'registration_required'];
            
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
            return $this->response->error('Failed to update event', $e->getMessage(), 500);
        }
    }

    /**
     * Delete event (soft delete)
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if event exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Event not found', 'Event with this ID does not exist', 404);
            }

            // Soft delete
            $stmt = $this->db->prepare("UPDATE {$this->table} SET is_public = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('Event deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete event', $e->getMessage(), 500);
        }
    }

    /**
     * Register user for event
     * @param int $event_id
     * @param array $data
     * @return array
     */
    public function registerForEvent($event_id, $data) {
        if (!isset($data['user_id'])) {
            return $this->response->error('Missing user ID', 'User ID is required', 400);
        }

        try {
            // Check if event exists and has available spots
            $stmt = $this->db->prepare("SELECT * FROM {$this->table} WHERE id = ? AND is_public = 1");
            $stmt->execute([$event_id]);
            $event = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$event) {
                return $this->response->error('Event not found', 'Event with this ID does not exist', 404);
            }

            if ($event['max_attendees'] && $event['current_attendees'] >= $event['max_attendees']) {
                return $this->response->error('Event full', 'This event has reached maximum capacity', 400);
            }

            // Check if user is already registered
            $stmt = $this->db->prepare("SELECT id FROM event_registrations WHERE event_id = ? AND user_id = ?");
            $stmt->execute([$event_id, $data['user_id']]);
            
            if ($stmt->fetch()) {
                return $this->response->error('Already registered', 'User is already registered for this event', 409);
            }

            // Begin transaction
            $this->db->beginTransaction();

            // Create registration
            $stmt = $this->db->prepare("
                INSERT INTO event_registrations (event_id, user_id, status) 
                VALUES (?, ?, 'registered')
            ");
            $stmt->execute([$event_id, $data['user_id']]);

            // Update event attendee count
            $stmt = $this->db->prepare("
                UPDATE {$this->table} 
                SET current_attendees = current_attendees + 1, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            ");
            $stmt->execute([$event_id]);

            $this->db->commit();

            return $this->response->success('User registered for event successfully', null);

        } catch (Exception $e) {
            $this->db->rollBack();
            return $this->response->error('Failed to register for event', $e->getMessage(), 500);
        }
    }

    /**
     * Get event registrations
     * @param int $event_id
     * @return array
     */
    public function getRegistrations($event_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT er.*, u.first_name, u.last_name, u.email, u.avatar
                FROM event_registrations er
                JOIN users u ON er.user_id = u.id
                WHERE er.event_id = ?
                ORDER BY er.registration_date ASC
            ");
            $stmt->execute([$event_id]);
            $registrations = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Event registrations retrieved successfully', $registrations);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve event registrations', $e->getMessage(), 500);
        }
    }

    /**
     * Get upcoming events
     * @param int $limit
     * @return array
     */
    public function getUpcomingEvents($limit = 5) {
        try {
            $stmt = $this->db->prepare("
                SELECT e.*, u.first_name, u.last_name as organizer_name
                FROM {$this->table} e
                JOIN users u ON e.organizer_id = u.id
                WHERE e.event_date >= CURDATE() AND e.is_public = 1
                ORDER BY e.event_date ASC
                LIMIT ?
            ");
            $stmt->execute([$limit]);
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Upcoming events retrieved successfully', $events);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve upcoming events', $e->getMessage(), 500);
        }
    }

    /**
     * Get events by type
     * @param string $event_type
     * @return array
     */
    public function getByType($event_type) {
        try {
            $stmt = $this->db->prepare("
                SELECT e.*, u.first_name, u.last_name as organizer_name
                FROM {$this->table} e
                JOIN users u ON e.organizer_id = u.id
                WHERE e.event_type = ? AND e.is_public = 1
                ORDER BY e.event_date ASC
            ");
            $stmt->execute([$event_type]);
            $events = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Events retrieved successfully', $events);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve events', $e->getMessage(), 500);
        }
    }
}
?>
