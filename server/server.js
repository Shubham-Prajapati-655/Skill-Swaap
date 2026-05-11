import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'data.json');

// Helper function to read from DB
const readDB = () => {
  const data = fs.readFileSync(DB_FILE, 'utf8');
  return JSON.parse(data);
};

// Helper function to write to DB
const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
};

// --- AUTH API ---

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = readDB();
  
  if (db.users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User with this email already exists' });
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  db.users.push(newUser);
  writeDB(db);

  res.status(201).json({ id: newUser.id, name: newUser.name, email: newUser.email });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();

  const foundUser = db.users.find(u => u.email === email && u.password === password);
  if (foundUser) {
    res.json({ id: foundUser.id, name: foundUser.name, email: foundUser.email });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// --- SKILLS API ---

app.get('/api/skills', (req, res) => {
  const db = readDB();
  res.json(db.skills);
});

app.post('/api/skills', (req, res) => {
  const newSkill = req.body;
  newSkill.id = Date.now().toString(); // Generate ID
  
  const db = readDB();
  db.skills.push(newSkill);
  writeDB(db);

  res.status(201).json(newSkill);
});

app.delete('/api/skills/:id', (req, res) => {
  const { id } = req.params;
  const db = readDB();
  
  const newSkills = db.skills.filter(s => s.id !== id);
  if (newSkills.length !== db.skills.length) {
    db.skills = newSkills;
    writeDB(db);
    res.status(200).json({ message: 'Deleted successfully' });
  } else {
    res.status(404).json({ error: 'Skill not found' });
  }
});

// --- LIVE DATA DASHBOARD (Phone se dekhne ke liye) ---
app.get('/dashboard', (req, res) => {
  const db = readDB();

  const userRows = db.users.map(u => `
    <tr>
      <td>${u.id}</td>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.password}</td>
    </tr>
  `).join('');

  const skillRows = db.skills.map(s => `
    <tr>
      <td>${s.id}</td>
      <td>${s.title}</td>
      <td>${s.category}</td>
      <td><span class="badge ${s.type === 'offering' ? 'badge-offer' : 'badge-look'}">${s.type === 'offering' ? 'Offering' : 'Looking For'}</span></td>
      <td>${s.user}</td>
      <td>${s.description || '-'}</td>
    </tr>
  `).join('');

  res.send(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skill Swap - Live Data Dashboard</title>
    <meta http-equiv="refresh" content="5">
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        font-family: 'Segoe UI', system-ui, sans-serif;
        background: #0a0a1a;
        color: #e0e0e0;
        padding: 1rem;
        min-height: 100vh;
      }
      h1 {
        text-align: center;
        font-size: 1.6rem;
        margin-bottom: 0.3rem;
        background: linear-gradient(135deg, #00f0ff, #b026ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .subtitle {
        text-align: center;
        font-size: 0.75rem;
        color: #888;
        margin-bottom: 1.5rem;
      }
      .live-dot {
        display: inline-block;
        width: 8px; height: 8px;
        background: #0f0;
        border-radius: 50%;
        margin-right: 5px;
        animation: pulse 1.5s infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      .section-title {
        font-size: 1.1rem;
        margin: 1.2rem 0 0.6rem;
        padding-left: 0.5rem;
        border-left: 3px solid #b026ff;
        color: #fff;
      }
      .stats {
        display: flex;
        gap: 0.8rem;
        margin-bottom: 1rem;
        flex-wrap: wrap;
      }
      .stat-card {
        flex: 1;
        min-width: 120px;
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 12px;
        padding: 0.8rem;
        text-align: center;
      }
      .stat-card .num {
        font-size: 1.8rem;
        font-weight: 700;
        background: linear-gradient(135deg, #00f0ff, #b026ff);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .stat-card .label { font-size: 0.7rem; color: #999; margin-top: 2px; }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.8rem;
        background: rgba(255,255,255,0.03);
        border-radius: 10px;
        overflow: hidden;
      }
      th {
        background: rgba(176, 38, 255, 0.2);
        color: #d0a0ff;
        padding: 0.6rem 0.5rem;
        text-align: left;
        font-weight: 600;
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }
      td {
        padding: 0.5rem;
        border-bottom: 1px solid rgba(255,255,255,0.05);
        word-break: break-word;
        max-width: 150px;
      }
      tr:hover { background: rgba(255,255,255,0.04); }
      .badge {
        padding: 2px 8px;
        border-radius: 20px;
        font-size: 0.65rem;
        font-weight: 600;
      }
      .badge-offer { background: rgba(0,240,255,0.15); color: #00f0ff; }
      .badge-look { background: rgba(176,38,255,0.15); color: #d0a0ff; }
      .empty { text-align: center; color: #666; padding: 1.5rem; font-style: italic; }
    </style>
  </head>
  <body>
    <h1>⚡ Skill Swap Dashboard</h1>
    <p class="subtitle"><span class="live-dot"></span>Live Data — Auto-refreshes every 5 seconds</p>

    <div class="stats">
      <div class="stat-card">
        <div class="num">${db.users.length}</div>
        <div class="label">Registered Users</div>
      </div>
      <div class="stat-card">
        <div class="num">${db.skills.length}</div>
        <div class="label">Total Skills</div>
      </div>
      <div class="stat-card">
        <div class="num">${db.skills.filter(s => s.type === 'offering').length}</div>
        <div class="label">Offering</div>
      </div>
      <div class="stat-card">
        <div class="num">${db.skills.filter(s => s.type === 'looking').length}</div>
        <div class="label">Looking For</div>
      </div>
    </div>

    <h2 class="section-title">👤 Registered Users</h2>
    ${db.users.length > 0 ? `
    <table>
      <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Password</th></tr></thead>
      <tbody>${userRows}</tbody>
    </table>
    ` : '<p class="empty">No users registered yet.</p>'}

    <h2 class="section-title">🛠️ Skills</h2>
    ${db.skills.length > 0 ? `
    <table>
      <thead><tr><th>ID</th><th>Title</th><th>Category</th><th>Type</th><th>User</th><th>Description</th></tr></thead>
      <tbody>${skillRows}</tbody>
    </table>
    ` : '<p class="empty">No skills posted yet.</p>'}
  </body>
  </html>
  `);
});

// --- SERVE REACT FRONTEND IN PRODUCTION ---
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // Catch-all route for React Router (must be LAST)
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
  console.log('Serving frontend from dist/');
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Dashboard: http://localhost:${PORT}/dashboard`);
});
