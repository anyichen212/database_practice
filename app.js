//pool.js = holds all the command functions

const express = require('express')
const app = express()
const PORT = 8080;
const db = require('./pool');

app.use(express.json());


app.get('/pets', db.getPets);
app.get('/pets/dogs', db.getDogs);
app.get('/pets/cats', db.getCats);
app.get('/pets/dogs/:id', db.getDogById);
app.get('/pets/cats/:id', db.getCatById);
app.post('/pets', db.createPet);
app.put('/pets/:id', db.updatePet);
app.delete('/pets/:id', db.deletePet);

const server = app.listen(PORT, () => {
  console.log(`Live on port: ${PORT}`);
});
