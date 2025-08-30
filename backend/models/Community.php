<?php
/**
 * Community Model Class
 * Handles community-related database operations
 */

require_once '../utils/Response.php';

class Community {
    private $db;
    private $response;
    private $table = 'community_posts';

    public function __construct() {
        $database = new Database();
        $this->db = $database->getConnection();
        $this->response = new Response();
    }

    /**
     * Get all community posts with optional filtering
     * @param array $filters
     * @return array
     */
    public function getAll($filters = []) {
        try {
            $sql = "SELECT cp.*, u.first_name, u.last_name, u.avatar, u.role
                    FROM {$this->table} cp
                    JOIN users u ON cp.author_id = u.id
                    WHERE cp.is_published = 1";
            $params = [];

            // Apply filters
            if (isset($filters['author_id'])) {
                $sql .= " AND cp.author_id = ?";
                $params[] = $filters['author_id'];
            }

            if (isset($filters['search'])) {
                $sql .= " AND cp.content LIKE ?";
                $params[] = "%{$filters['search']}%";
            }

            $sql .= " ORDER BY cp.created_at DESC";

            // Apply pagination
            $page = $filters['page'] ?? 1;
            $limit = $filters['limit'] ?? 10;
            $offset = ($page - 1) * $limit;

            $sql .= " LIMIT ? OFFSET ?";
            $params[] = $limit;
            $params[] = $offset;

            $stmt = $this->db->prepare($sql);
            $stmt->execute($params);
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Community posts retrieved successfully', $posts);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve community posts', $e->getMessage(), 500);
        }
    }

    /**
     * Get all posts (for posts endpoint)
     * @param array $filters
     * @return array
     */
    public function getAllPosts($filters = []) {
        return $this->getAll($filters);
    }

    /**
     * Get post by ID
     * @param int $id
     * @return array
     */
    public function getById($id) {
        try {
            $stmt = $this->db->prepare("
                SELECT cp.*, u.first_name, u.last_name, u.avatar, u.role
                FROM {$this->table} cp
                JOIN users u ON cp.author_id = u.id
                WHERE cp.id = ? AND cp.is_published = 1
            ");
            $stmt->execute([$id]);
            $post = $stmt->fetch(PDO::FETCH_ASSOC);

            if (!$post) {
                return $this->response->error('Post not found', 'Post with this ID does not exist', 404);
            }

            return $this->response->success('Post retrieved successfully', $post);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve post', $e->getMessage(), 500);
        }
    }

    /**
     * Get post by ID (for posts endpoint)
     * @param int $id
     * @return array
     */
    public function getPostById($id) {
        return $this->getById($id);
    }

    /**
     * Create new community post
     * @param array $data
     * @return array
     */
    public function create($data) {
        $required_fields = ['author_id', 'content'];
        
        foreach ($required_fields as $field) {
            if (!isset($data[$field]) || empty($data[$field])) {
                return $this->response->error('Missing required field', "Field '$field' is required", 400);
            }
        }

        try {
            // Insert new post
            $stmt = $this->db->prepare("
                INSERT INTO {$this->table} (author_id, content, tags) 
                VALUES (?, ?, ?)
            ");
            
            $stmt->execute([
                $data['author_id'],
                $data['content'],
                isset($data['tags']) ? json_encode($data['tags']) : null
            ]);

            $post_id = $this->db->lastInsertId();
            return $this->getById($post_id);

        } catch (Exception $e) {
            return $this->response->error('Failed to create post', $e->getMessage(), 500);
        }
    }

    /**
     * Create new post (for posts endpoint)
     * @param array $data
     * @return array
     */
    public function createPost($data) {
        return $this->create($data);
    }

    /**
     * Update community post
     * @param int $id
     * @param array $data
     * @return array
     */
    public function update($id, $data) {
        try {
            // Check if post exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Post not found', 'Post with this ID does not exist', 404);
            }

            // Build update query
            $update_fields = [];
            $values = [];

            $allowed_fields = ['content', 'tags', 'is_published'];
            
            foreach ($allowed_fields as $field) {
                if (isset($data[$field])) {
                    if ($field === 'tags') {
                        $update_fields[] = "$field = ?";
                        $values[] = json_encode($data[$field]);
                    } else {
                        $update_fields[] = "$field = ?";
                        $values[] = $data[$field];
                    }
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
            return $this->response->error('Failed to update post', $e->getMessage(), 500);
        }
    }

    /**
     * Delete community post (soft delete)
     * @param int $id
     * @return array
     */
    public function delete($id) {
        try {
            // Check if post exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ?");
            $stmt->execute([$id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Post not found', 'Post with this ID does not exist', 404);
            }

            // Soft delete
            $stmt = $this->db->prepare("UPDATE {$this->table} SET is_published = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?");
            $stmt->execute([$id]);

            return $this->response->success('Post deleted successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to delete post', $e->getMessage(), 500);
        }
    }

    /**
     * Like a post
     * @param int $post_id
     * @param array $data
     * @return array
     */
    public function likePost($post_id, $data) {
        if (!isset($data['user_id'])) {
            return $this->response->error('Missing user ID', 'User ID is required', 400);
        }

        try {
            // Check if post exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_published = 1");
            $stmt->execute([$post_id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Post not found', 'Post with this ID does not exist', 404);
            }

            // Check if user already liked the post
            $stmt = $this->db->prepare("SELECT id FROM post_likes WHERE post_id = ? AND user_id = ?");
            $stmt->execute([$post_id, $data['user_id']]);
            
            if ($stmt->fetch()) {
                // Unlike the post
                $stmt = $this->db->prepare("DELETE FROM post_likes WHERE post_id = ? AND user_id = ?");
                $stmt->execute([$post_id, $data['user_id']]);

                // Update post likes count
                $stmt = $this->db->prepare("UPDATE {$this->table} SET likes_count = likes_count - 1 WHERE id = ?");
                $stmt->execute([$post_id]);

                return $this->response->success('Post unliked successfully', ['liked' => false]);
            } else {
                // Like the post
                $stmt = $this->db->prepare("INSERT INTO post_likes (post_id, user_id) VALUES (?, ?)");
                $stmt->execute([$post_id, $data['user_id']]);

                // Update post likes count
                $stmt = $this->db->prepare("UPDATE {$this->table} SET likes_count = likes_count + 1 WHERE id = ?");
                $stmt->execute([$post_id]);

                return $this->response->success('Post liked successfully', ['liked' => true]);
            }

        } catch (Exception $e) {
            return $this->response->error('Failed to like/unlike post', $e->getMessage(), 500);
        }
    }

    /**
     * Get post comments
     * @param int $post_id
     * @return array
     */
    public function getComments($post_id) {
        try {
            $stmt = $this->db->prepare("
                SELECT pc.*, u.first_name, u.last_name, u.avatar
                FROM post_comments pc
                JOIN users u ON pc.author_id = u.id
                WHERE pc.post_id = ?
                ORDER BY pc.created_at ASC
            ");
            $stmt->execute([$post_id]);
            $comments = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $this->response->success('Comments retrieved successfully', $comments);

        } catch (Exception $e) {
            return $this->response->error('Failed to retrieve comments', $e->getMessage(), 500);
        }
    }

    /**
     * Add comment to post
     * @param int $post_id
     * @param array $data
     * @return array
     */
    public function addComment($post_id, $data) {
        if (!isset($data['author_id']) || !isset($data['content'])) {
            return $this->response->error('Missing required fields', 'Author ID and content are required', 400);
        }

        try {
            // Check if post exists
            $stmt = $this->db->prepare("SELECT id FROM {$this->table} WHERE id = ? AND is_published = 1");
            $stmt->execute([$post_id]);
            
            if (!$stmt->fetch()) {
                return $this->response->error('Post not found', 'Post with this ID does not exist', 404);
            }

            // Insert comment
            $stmt = $this->db->prepare("
                INSERT INTO post_comments (post_id, author_id, content, parent_id) 
                VALUES (?, ?, ?, ?)
            ");
            
            $stmt->execute([
                $post_id,
                $data['author_id'],
                $data['content'],
                $data['parent_id'] ?? null
            ]);

            // Update post comments count
            $stmt = $this->db->prepare("UPDATE {$this->table} SET comments_count = comments_count + 1 WHERE id = ?");
            $stmt->execute([$post_id]);

            return $this->response->success('Comment added successfully', null);

        } catch (Exception $e) {
            return $this->response->error('Failed to add comment', $e->getMessage(), 500);
        }
    }
}
?>
