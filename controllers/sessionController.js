const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('jwt', token, { httpOnly: true }).json({ message: 'Login exitoso', token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.current = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ message: 'No estás autenticado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Token inválido' });
    }
    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
  }
};
