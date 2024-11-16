const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const sessionRouter = require('./routes/sessionRouter');
const passport = require('./config/passport');

require('dotenv').config(); // Carga variables desde .env

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

// Rutas
app.use('/api/sessions', sessionRouter);

// Conexión a la base de datos
mongoose
  .connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos'))
  .catch((err) => console.error('Error al conectar la base de datos:', err));

// Inicio del servidor
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
