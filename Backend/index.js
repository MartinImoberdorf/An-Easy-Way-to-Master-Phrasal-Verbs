const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();

app.use(express.json()); 

app.use(cors());

const routes = require('./routes/phrasalVerbs');
app.use('/', routes);

const port = 4000;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

module.exports = app;

