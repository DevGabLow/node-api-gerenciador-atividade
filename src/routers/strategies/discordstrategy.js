const passport = require('passport');

var DiscordStrategy = require('passport-discord').Strategy;

var scopes = ['identify'];

passport.deserializeUser((id,done)=>{
    done(null,false)
})

passport.serializeUser((id,done)=>{
    done(null,{})
})

passport.use(new DiscordStrategy({
    clientID: process.env.clientId_Discord,
    clientSecret: process.env.clientSecretDiscord,
    callbackURL: process.env.callBackDiscord,
    scope: scopes
},
    function (accessToken, refreshToken, profile, done) {
        done(null,profile);    
    }));