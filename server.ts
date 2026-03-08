import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const db = new Database("uniapply.db");

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS universities (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    state TEXT NOT NULL,
    type TEXT NOT NULL, -- Government, Private
    ranking INTEGER,
    description TEXT,
    website TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS courses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    university_id INTEGER,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- B.Tech, MBBS, BBA, etc.
    duration TEXT,
    fees INTEGER,
    entrance_exam TEXT,
    description TEXT,
    FOREIGN KEY (university_id) REFERENCES universities(id)
  );

  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT,
    phone TEXT,
    dob TEXT,
    gender TEXT,
    nationality TEXT,
    address TEXT,
    education_history TEXT,
    tenth_marks TEXT,
    twelfth_marks TEXT,
    jee_percentile TEXT,
    cuet_score TEXT,
    settings TEXT -- JSON string
  );

  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    university_id INTEGER,
    course_id INTEGER,
    status TEXT DEFAULT 'Draft', -- Draft, Submitted, Under Review, Accepted, Rejected
    submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (university_id) REFERENCES universities(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );
`);

// Seed Data (only if empty)
const rowCount = db.prepare("SELECT COUNT(*) as count FROM universities").get() as { count: number };
if (rowCount.count === 0) {
  const insertUni = db.prepare("INSERT INTO universities (name, location, state, type, ranking, description, website, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
  const insertCourse = db.prepare("INSERT INTO courses (university_id, name, type, duration, fees, entrance_exam, description) VALUES (?, ?, ?, ?, ?, ?, ?)");

  const iitb = insertUni.run("Indian Institute of Technology Bombay", "Mumbai", "Maharashtra", "Government", 1, "Premier engineering institute in India.", "https://www.iitb.ac.in", "https://picsum.photos/seed/iitb/800/600").lastInsertRowid;
  insertCourse.run(iitb, "B.Tech Computer Science", "Engineering", "4 Years", 200000, "JEE Advanced", "Highly competitive CS program.");
  insertCourse.run(iitb, "B.Tech Mechanical Engineering", "Engineering", "4 Years", 200000, "JEE Advanced", "Core mechanical engineering.");

  const bits = insertUni.run("BITS Pilani", "Pilani", "Rajasthan", "Private", 5, "Top private engineering university.", "https://www.bits-pilani.ac.in", "https://picsum.photos/seed/bits/800/600").lastInsertRowid;
  insertCourse.run(bits, "B.E. Computer Science", "Engineering", "4 Years", 500000, "BITSAT", "Excellent industry exposure.");

  const aiims = insertUni.run("AIIMS Delhi", "New Delhi", "Delhi", "Government", 1, "Best medical college in India.", "https://www.aiims.edu", "https://picsum.photos/seed/aiims/800/600").lastInsertRowid;
  insertCourse.run(aiims, "MBBS", "Medicine", "5.5 Years", 5000, "NEET", "Top-tier medical training.");

  const du = insertUni.run("University of Delhi", "New Delhi", "Delhi", "Government", 10, "Renowned central university.", "http://www.du.ac.in", "https://picsum.photos/seed/du/800/600").lastInsertRowid;
  insertCourse.run(du, "B.A. Economics (Hons)", "Arts", "3 Years", 15000, "CUET", "Prestigious economics course.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/universities", (req, res) => {
    const unis = db.prepare("SELECT * FROM universities").all();
    res.json(unis);
  });

  app.get("/api/universities/:id", (req, res) => {
    const uni = db.prepare("SELECT * FROM universities WHERE id = ?").get(req.params.id);
    const courses = db.prepare("SELECT * FROM courses WHERE university_id = ?").all(req.params.id);
    res.json({ ...uni, courses });
  });

  app.get("/api/courses", (req, res) => {
    const courses = db.prepare(`
      SELECT courses.*, universities.name as university_name 
      FROM courses 
      JOIN universities ON courses.university_id = universities.id
    `).all();
    res.json(courses);
  });

  app.get("/api/courses/:id", (req, res) => {
    const course = db.prepare(`
      SELECT courses.*, universities.name as university_name, universities.location as university_location
      FROM courses 
      JOIN universities ON courses.university_id = universities.id
      WHERE courses.id = ?
    `).get(req.params.id);
    res.json(course);
  });

  // Simple Auth & Application Mocking (for demo purposes)
  app.post("/api/auth/login", (req, res) => {
    const { email, name } = req.body;
    let user = db.prepare("SELECT * FROM students WHERE email = ?").get(email) as any;
    
    if (!user && name) {
      // Signup
      const info = db.prepare("INSERT INTO students (name, email) VALUES (?, ?)").run(name, email);
      user = db.prepare("SELECT * FROM students WHERE id = ?").get(info.lastInsertRowid);
    } else if (!user) {
      // Ensure a demo user exists for the given email
      const demoEmail = email || "student@example.com";
      const existing = db.prepare("SELECT * FROM students WHERE email = ?").get(demoEmail);
      if (existing) {
        user = existing;
      } else {
        const info = db.prepare("INSERT INTO students (name, email) VALUES (?, ?)").run("Demo Student", demoEmail);
        user = db.prepare("SELECT * FROM students WHERE id = ?").get(info.lastInsertRowid);
      }
    }

    if (user.settings) {
      user.settings = JSON.parse(user.settings);
    } else {
      user.settings = { email_notifications: true, sms_alerts: false, profile_visibility: true };
    }

    res.json(user);
  });

  app.get("/api/applications/:studentId", (req, res) => {
    const apps = db.prepare(`
      SELECT applications.*, universities.name as university_name, courses.name as course_name
      FROM applications
      JOIN universities ON applications.university_id = universities.id
      JOIN courses ON applications.course_id = courses.id
      WHERE student_id = ?
    `).all(req.params.studentId);
    res.json(apps);
  });

  app.post("/api/applications", (req, res) => {
    const { student_id, university_id, course_id, status } = req.body;
    const info = db.prepare("INSERT INTO applications (student_id, university_id, course_id, status) VALUES (?, ?, ?, ?)").run(student_id, university_id, course_id, status || 'Draft');
    res.json({ id: info.lastInsertRowid, status: status || 'Draft' });
  });

  app.put("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    
    // Filter out fields that are not in the database schema
    const allowedFields = [
      'name', 'email', 'phone', 'dob', 'gender', 'nationality', 
      'address', 'education_history', 'tenth_marks', 'twelfth_marks', 
      'jee_percentile', 'cuet_score', 'settings'
    ];
    
    const fieldsToUpdate = Object.keys(updates).filter(key => allowedFields.includes(key));
    
    if (fieldsToUpdate.length === 0) {
      return res.json({ success: true, message: "No valid fields to update" });
    }
    
    const setClause = fieldsToUpdate.map(key => `${key} = ?`).join(', ');
    const values = fieldsToUpdate.map(key => {
      if (key === 'settings') return JSON.stringify(updates[key]);
      return updates[key];
    });
    
    try {
      db.prepare(`UPDATE students SET ${setClause} WHERE id = ?`).run(...values, id);
      const updatedUser = db.prepare("SELECT * FROM students WHERE id = ?").get(id) as any;
      if (updatedUser.settings) updatedUser.settings = JSON.parse(updatedUser.settings);
      res.json({ success: true, user: updatedUser });
    } catch (error) {
      console.error("Update user error:", error);
      res.status(500).json({ success: false, error: "Failed to update user" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
