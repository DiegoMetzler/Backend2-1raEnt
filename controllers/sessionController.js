const userService = require('../services/userService');
const { hashPassword, comparePassword } = require('../utils/bcryptUtils');
const { generateToken } = require('../utils/jwtUtils');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    const token = generateToken(user);

    res.cookie('authToken', token, { httpOnly: true });
    res.status(200).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

  
    const userDTO = {
      id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({ user: userDTO });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

module.exports = { login, getCurrentUser };
