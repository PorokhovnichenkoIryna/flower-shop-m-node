const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views')));

// Ініціалізація БД
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error(err.message);
  }
});

db.run('CREATE TABLE IF NOT EXISTS flowers (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price REAL)');


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/flowers', (req, res) => {
  const { name, price } = req.body;
  db.run('INSERT INTO flowers (name, price) VALUES (?, ?)', [name, price], function(err) {
    if (err) {
      return console.error(err.message);
    }
    res.status(201).json({ id: this.lastID, name, price });
  });
});

app.get('/flowers', (req, res) => {
  db.all('SELECT * FROM flowers', [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
