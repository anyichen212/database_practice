const express = require('express')
const app = express()
const PORT = 8080;
const db = require('./pool');


app.get('/pets', db.getPetsById);

const server = app.listen(PORT, () => {
  console.log(`Live on port: ${PORT}`);
});
