const User = require('../models/User');

const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

module.exports = { findUserByEmail };
