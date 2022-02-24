const { verify } = require('../util/jwt/jwtUtil')

function verifyJwt(req, res, next) {
  const { cookies } = req;
  const token = cookies.cookieAuth;
  if (!token) return res.status(401).json({ message: 'No token provided.' });


  const tk = verify(token, res);

  if (tk) {
    next();
  } else {
    return res.status(401).json({ message: "Não autorizado" })
  }
}

module.exports = verifyJwt