const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const passport = require("passport")

const { serialize } = require('cookie');

const { findUser } = require('../../executeSchemas/user');

const { NOT_AUTHORIZATION } = require('../../util/messages/errors');
const { signIn, decode } = require('../../util/jwt/jwtUtil');
const loggedSchema = require('../../executeSchemas/logged_schema');
const { findByUserId, deleteSessionByUserId } = require('../../executeSchemas/logged_schema');


router.get('/login', async (req, res) => {

    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json(NOT_AUTHORIZATION);
    }

    const base64Credentials = req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    try {
        findUser({ email: username }, (result) => {
            if (!result) {
                return res.status(401).json(NOT_AUTHORIZATION);
            }
            bcrypt.compare(password, result.password).then((passwordEquals) => {
                if (passwordEquals) {
                    delete result.password;
                    const token = signIn(result);
                    result.token = token;

                    loggedSchema.insertSessionStart(result);

                    const serialized = serialize("cookieAuth", token, {
                        httpOnly: false,
                        secure: false,
                        sameSite: "none",
                        maxAge: 1 * 60 * 60 * 1000, //1h
                        path: "/"
                    });
                    res.setHeader("Set-Cookie", serialized);
                    res.status(200).json({ message: "Logged!" });
                } else {
                    return res.status(401).json(NOT_AUTHORIZATION);
                }
            });
        })
    } catch (error) {
        return res.status(401).json(NOT_AUTHORIZATION);
    }



})

const buildUserByCookie = (req = null) => {
    if (req) {
        const cookieAuth = req.cookies.cookieAuth;
        const cookieDecode = decode(cookieAuth);
        return cookieDecode?.user;
    }
}

router.get('/logout', (req, res) => {
    const user = buildUserByCookie(req);
    if (user?.id) {
        deleteSessionByUserId(user.id)
        res.status(202).clearCookie("cookieAuth").redirect('/auth/redirect')
    }
})

router.get('/cookieserver', (req, res) => {
    if (buildUserByCookie(req)) {
        const user = buildUserByCookie(req);
        findByUserId(user.id, (result) => {
            if (result?.kill_logged_by_admin) {
                res.status(202).redirect('/auth/logout')
            } else {
                res.json(req.cookies)
            }
        })
    } else {
        res.json(null)
    }
})

router.get("/redirect", (req, res) => {
    res.writeHead(301, { "Location": process.env.redirect_url });
    return res.end();
})


router.get('/gen', (req, res) => {
    bcrypt.hash(req.body.pass, 10).then((hash) => {
        return res.json({ pass: hash })
    })
})

//DISCORD

router.get('/discord', passport.authenticate('discord'));

router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/auth/logout'
}), function (req, res) {



    res.cookie("passId", req.user.id)
    res.cookie("avatar", `https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}`)
    res.writeHead(301, { "Location": process.env.redirect_url });
    return res.end();
});


module.exports = router