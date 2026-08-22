# Database Integration

A RESTful CRUD API built with **Node.js**, **Express**, and SQLite
(via Node's built-in `node:sqlite` module), demonstrating database
schema design, persistent data storage, and secure query handling.

---

## Overview

This project connects a backend API to a relational database,
covering the core fundamentals of data persistence:

- Schema design with proper constraints
- Full CRUD operations (Create, Read, Update, Delete)
- Protection against SQL injection via parameterized queries
- Verified data persistence across server restarts

---

## Tech Stack

- **Node.js** + **Express** — server & routing
- **SQLite** (`node:sqlite`, built-in) — database, no external setup required

---

## Project Structure

```
.
├── package.json
├── server.js
└── app.db        (auto-generated on first run)
```

---

## Getting Started

```bash
npm install
npm start
```

Server runs at `http://localhost:3000`. A local `app.db` SQLite file
is created automatically.

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/users` | Create a new user |
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get a user by ID |
| PUT | `/users/:id` | Update a user |
| DELETE | `/users/:id` | Delete a user |

**Example request body:**
```json
{ "name": "Khadija", "email": "khadija@gmail.com", "age": 19 }
```

---

## Database Schema

```sql
CREATE TABLE users (
  id     INTEGER PRIMARY KEY AUTOINCREMENT,
  name   TEXT NOT NULL,
  email  TEXT NOT NULL UNIQUE,
  age    INTEGER
);
```

---

## Security

All queries use parameterized statements (`?` placeholders) rather
than string concatenation, ensuring user input is never treated as
executable SQL.

```js
db.prepare("SELECT * FROM users WHERE id = ?").get(req.params.id);
```

---

## Viewing the Database

app.db is a binary file and won't display in a text editor. To inspect it visually, install the SQLite Viewer extension in VS Code (search "SQLite Viewer" in the Extensions tab), then click on app.db in the file explorer to view its contents as a table.

Alternatively, use DB Browser for SQLite as a standalone desktop app.

---

*Built as part of a Full Stack Development training program by DecodeLabs.*