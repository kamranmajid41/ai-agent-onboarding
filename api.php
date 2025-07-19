<?php
// PHP Proxy for Node.js Backend on Shared Hosting
header('Content-Type: application/json);
header('Access-Control-Allow-Origin: *);
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS);
header('Access-Control-Allow-Headers: Content-Type, Authorization);

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get the request method and path
$method = $_SERVER['REQUEST_METHOD'];
$path = $_SERVER['REQUEST_URI'];
$path = str_replace('/api.php, , $path);

// Load environment variables
$env_file = __DIR__ ./api/.env;
if (file_exists($env_file)) [object Object]    $env_content = file_get_contents($env_file);
    $env_lines = explode(n,$env_content);
    foreach ($env_lines as $line)[object Object]        if (strpos($line, =lse) [object Object]            list($key, $value) = explode('=', $line, 2;
            $_ENV[trim($key)] = trim($value);
        }
    }
}

// Database connection for direct PHP access
$db_host = $_ENV['DB_HOST'] ?? 'localhost;
$db_user = $_ENV['DB_USER'] ?? u216462115mranmajid41B_NAME = $_ENV['DB_NAME] ??u216462115nger_db;
$db_pass = $_ENV['DB_PASSWORD'] ??;

try [object Object]    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(50  echo json_encode(['error' => 'Database connection failed']);
    exit();
}

// Simple API routing
switch ($path) {
    case /health':
        echo json_encode(['status' => ok',message' => 'API is running]);
        break;
        
    case '/auth/login':
        if ($method === 'POST) {            $input = json_decode(file_get_contents('php://input'), true);
            // Handle login logic here
            echo json_encode(['message' => 'Login endpoint reached']);
        } else [object Object]     http_response_code(405);
            echo json_encode([error' => 'Method not allowed']);
        }
        break;
        
    case/user/profile':
        if ($method === 'GET') {
            // Handle get profile logic here
            echo json_encode(['message' =>Profile endpoint reached']);
        } else [object Object]     http_response_code(405);
            echo json_encode([error' => 'Method not allowed']);
        }
        break;
        
    default:
        http_response_code(404
        echo json_encode(['error => Endpoint not found, path' => $path]);
        break;
}
?> 