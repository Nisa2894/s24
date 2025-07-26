const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

// Set up SQLite database
const db = new sqlite3.Database('./service24.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to SQLite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS providers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    photo_path TEXT,
    address TEXT NOT NULL,
    nid TEXT NOT NULL,
    expertise TEXT NOT NULL,
    experience INTEGER NOT NULL,
    document_path TEXT,
    verified BOOLEAN DEFAULT FALSE
)`);

db.run(`CREATE TABLE IF NOT EXISTS seekers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    nid TEXT NOT NULL,
    verified BOOLEAN DEFAULT FALSE
)`);

// Set up file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = './uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Serve static files
app.use(express.static('public'));

// API endpoints for providers
app.post('/api/providers', upload.fields([{ name: 'photo' }, { name: 'document' }]), (req, res) => {
    const { name, address, nid, expertise, experience } = req.body;
    const photoPath = req.files?.['photo']?.[0]?.path || null;
    const documentPath = req.files?.['document']?.[0]?.path || null;

    db.run(
        `INSERT INTO providers (name, photo_path, address, nid, expertise, experience, document_path) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, photoPath, address, nid, expertise, experience, documentPath],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

app.get('/api/providers', (req, res) => {
    db.all(`SELECT * FROM providers`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.put('/api/providers/:id/verify', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT verified FROM providers WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        const newStatus = !row.verified;
        db.run(`UPDATE providers SET verified = ? WHERE id = ?`, [newStatus, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
    });
});

// API endpoints for seekers
app.post('/api/seekers', upload.none(), (req, res) => {
    const { name, address, nid } = req.body;

    db.run(
        `INSERT INTO seekers (name, address, nid) VALUES (?, ?, ?)`,
        [name, address, nid],
        function(err) {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ id: this.lastID });
        }
    );
});

app.get('/api/seekers', (req, res) => {
    db.all(`SELECT * FROM seekers`, [], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

app.put('/api/seekers/:id/verify', (req, res) => {
    const id = req.params.id;
    db.get(`SELECT verified FROM seekers WHERE id = ?`, [id], (err, row) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
        const newStatus = !row.verified;
        db.run(`UPDATE seekers SET verified = ? WHERE id = ?`, [newStatus, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: err.message });
            }
            res.json({ success: true });
        });
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
