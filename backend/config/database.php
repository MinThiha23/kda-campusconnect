<?php
/**
 * Database Configuration for KD Academy Campus Connect
 * 
 * This file handles the database connection and configuration
 * for the campus management system.
 */

class Database {
    private $host = 'localhost';
    private $db_name = 'kda_campus_connect';
    private $username = 'root';
    private $password = '';
    private $conn;

    /**
     * Get database connection
     * @return PDO|null
     */
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }

        return $this->conn;
    }

    /**
     * Test database connection
     * @return bool
     */
    public function testConnection() {
        try {
            $conn = $this->getConnection();
            if ($conn) {
                return true;
            }
        } catch (Exception $e) {
            return false;
        }
        return false;
    }
}

// Environment-based configuration
if (file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    if (isset($env['DB_HOST'])) $host = $env['DB_HOST'];
    if (isset($env['DB_NAME'])) $db_name = $env['DB_NAME'];
    if (isset($env['DB_USER'])) $username = $env['DB_USER'];
    if (isset($env['DB_PASS'])) $password = $env['DB_PASS'];
}
?>
