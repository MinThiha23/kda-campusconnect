<?php
/**
 * Response Utility Class
 * Handles standardized API responses
 */

class Response {
    private $response = [
        'success' => false,
        'message' => '',
        'data' => null,
        'error' => null,
        'timestamp' => null
    ];

    /**
     * Create a success response
     * @param string $message
     * @param mixed $data
     * @param int $code
     * @return array
     */
    public function success($message = 'Success', $data = null, $code = 200) {
        http_response_code($code);
        
        $this->response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'error' => null,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        return $this->response;
    }

    /**
     * Create an error response
     * @param string $message
     * @param string $error
     * @param int $code
     * @return array
     */
    public function error($message = 'Error', $error = null, $code = 400) {
        http_response_code($code);
        
        $this->response = [
            'success' => false,
            'message' => $message,
            'data' => null,
            'error' => $error,
            'timestamp' => date('Y-m-d H:i:s')
        ];
        
        return $this->response;
    }

    /**
     * Get the current response
     * @return array
     */
    public function getResponse() {
        return $this->response;
    }

    /**
     * Create a paginated response
     * @param string $message
     * @param array $data
     * @param int $page
     * @param int $limit
     * @param int $total
     * @return array
     */
    public function paginated($message = 'Success', $data = [], $page = 1, $limit = 10, $total = 0) {
        $totalPages = ceil($total / $limit);
        
        $pagination = [
            'current_page' => $page,
            'per_page' => $limit,
            'total' => $total,
            'total_pages' => $totalPages,
            'has_next' => $page < $totalPages,
            'has_prev' => $page > 1
        ];
        
        return $this->success($message, [
            'data' => $data,
            'pagination' => $pagination
        ]);
    }
}
?>
