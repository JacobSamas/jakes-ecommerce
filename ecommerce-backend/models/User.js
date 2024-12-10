const pool = require("../config/db");

// Save user
const saveUser = async (name, email, hashedPassword) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]
  );
  return result.insertId;
};

// Find user by email
const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
};

// Find user by ID
const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
};

module.exports = { saveUser, findUserByEmail, findUserById };
