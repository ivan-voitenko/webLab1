const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let contacts = [
  { id: 1, name: "Veronica Burda", number: "+380638720754" },
  { id: 2, name: "Angela Bailuk", number: "+380979837621" },
  { id: 3, name: "Amelia Sluchinska", number: "+380638729870" },
  { id: 4, name: "Marina Ardanovich", number: "+380638720912" }
];

// GET all contacts
app.get('/contacts', (req, res) => {
  res.json(contacts);
});

// POST new contact
app.post('/contacts', (req, res) => {
  const { name, number } = req.body;
  const newId = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 1;
  contacts.push({ id: newId, name, number });
  res.status(201).json({ id: newId });
});

// DELETE contact by id
app.delete('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  contacts = contacts.filter(c => c.id !== id);
  res.sendStatus(204);
});

// PUT update contact by id
app.put('/contacts/:id', (req, res) => {
  const id = Number(req.params.id);
  const { name, number } = req.body;
  const contact = contacts.find(c => c.id === id);
  if (!contact) return res.sendStatus(404);
  contact.name = name;
  contact.number = number;
  res.sendStatus(200);
});

app.listen(3000, () => console.log('Server listening on port 3000'));
