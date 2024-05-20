const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const todoRoutes = require('./routes/todoRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Conectado ao banco de dados com sucesso!"))
  .catch(err => console.log("Conexão com o banco de dados falhou:", err));

app.use(cors());
app.use(bodyParser.json());
app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Servidor está funcionando na porta ${PORT}.`);
});
