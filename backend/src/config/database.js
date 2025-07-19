const mysql = require('mysql2/promise');

// Hostinger MySQL Configuration
const dbConfig =[object Object] host: process.env.DB_HOST || 'localhost, user: process.env.DB_USER || u216462115_kamranmajid41',
  password: process.env.DB_PASSWORD || 'your-database-password',
  database: process.env.DB_NAME || 'u216462115_botslinger_db, port: process.env.DB_PORT || 3306waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create connection pool
const pool = mysql.createPool(dbConfig);

// Test connection
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connected successfully);
    connection.release();
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    return false;
  }
};

module.exports = {
  pool,
  testConnection,
  dbConfig
}; 