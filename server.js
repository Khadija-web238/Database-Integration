const express = require("express");
const { DatabaseSync } = require("node:sqlite");

const app = express();
app.use(express.json());


app.use((err, req, res, next) => {
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON " });
  }
  next(err);
});

const db = new DatabaseSync("app.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    age INTEGER
  )
`);

app.post("/users", (req, res) => {
  const { name, email, age } = req.body;
  try {
    const result = db
      .prepare("INSERT INTO users (name, email, age) VALUES (?, ?, ?)")
      .run(name, email, age);
    const newUser = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(result.lastInsertRowid);
    res.json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get("/users", (req, res) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
});

app.get("/users/:id", (req, res) => {
  const user = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.put("/users/:id", (req, res) => {
  const { name, email, age } = req.body;
  db.prepare("UPDATE users SET name=?, email=?, age=? WHERE id=?").run(
    name,
    email,
    age,
    req.params.id
  );
  const updated = db
    .prepare("SELECT * FROM users WHERE id = ?")
    .get(req.params.id);
  res.json(updated);
});

app.delete("/users/:id", (req, res) => {
  db.prepare("DELETE FROM users WHERE id = ?").run(req.params.id);
  res.json({ message: "User deleted successfully" });
});

app.listen(3000, () => {
  console.log("Server runs: http://localhost:3000");
});