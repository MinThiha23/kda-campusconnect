<?php
// Test database connection
require_once 'config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    if ($conn) {
        echo "✅ Database connection successful!\n";
        
        // Test query
        $stmt = $conn->query("SELECT COUNT(*) as user_count FROM users");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo "✅ Database query successful!\n";
        echo "📊 Users in database: " . $result['user_count'] . "\n";
        
        // Test courses
        $stmt = $conn->query("SELECT COUNT(*) as course_count FROM courses");
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        echo "📚 Courses in database: " . $result['course_count'] . "\n";
        
    } else {
        echo "❌ Database connection failed!\n";
    }
} catch (Exception $e) {
    echo "❌ Error: " . $e->getMessage() . "\n";
}
?>
