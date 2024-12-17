const passport = require('passport');

const authMiddleware = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) return res.status(401).json({ error: 'No autorizado' });
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authMiddleware };
