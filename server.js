require('dotenv').config();
const express = require('express');
const mongoose = require('./config/dbConfig');
const passport = require('passport');
const { initializePassport } = require('./config/passportConfig');

const cartRouter = require('./routes/cartRouter');
const productRouter = require('./routes/productRouter');
const sessionRouter = require('./routes/sessionRouter');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
initializePassport();
app.use(passport.initialize());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
