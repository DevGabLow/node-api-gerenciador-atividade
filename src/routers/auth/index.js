const express = require('express');
const router = express.Router();
const { serialize } = require('cookie');
const { signIn } = require('../../util/jwt/jwtUtil');
const bcrypt = require('bcrypt');
const { findUser } = require('../../executeSchemas/user');
const { NOT_AUTHORIZATION } = require('../../util/messages/errors');




router.get('/login', async (req, res) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Not Authorization' });
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    findUser({ email: username }, (result) => {
        if (!result) {
            return res.status(401).json(NOT_AUTHORIZATION);
        }
        bcrypt.compare(password, result.password).then((passwordEquals) => {
            if (passwordEquals) {
                delete result.password;
                const token = signIn(result);

                const serialized = serialize("cookieAuth", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== "development",
                    sameSite: "strict",
                    maxAge: 300,
                    path: "/"
                });
                res.setHeader("Set-Cookie", serialized);
                res.status(200).json({ message: "Success!!" });
            } else {
                return res.status(401).json({message: "aaaa"});
            }
        });

    })



})

router.get('/logout',(req,res)=>{
    res.status(202).clearCookie("cookieAuth").json({message:"Logout"});
})

router.get('/cookieserver', (req,res)=>{
    res.json(req.cookies)
})


// router.get('/gen', (req,res)=>{
//     bcrypt.hash(req.body.pass, 10).then((hash)=>{
//         return res.json({pass: hash})
//     })
// })

module.exports = router