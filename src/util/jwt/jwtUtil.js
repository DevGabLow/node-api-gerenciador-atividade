const jwt = require("jsonwebtoken")


const verify = (token) => jwt.verify(token, process.env.SECRET);
const signIn = (user = {}) => jwt.sign({ user }, process.env.SECRET, { expiresIn: 300 });
const decode = (token) => jwt.decode(token)


module.exports = { verify, signIn, decode }