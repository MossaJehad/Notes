const express = require('express')
const router = express.Router()
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/User')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    async function (accessToken, refreshToken, profile, done) {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName || 'Notes User',
            firstName: (profile.name && profile.name.givenName) || profile.displayName || 'User',
            lastName: (profile.name && profile.name.familyName) || '',
            profileImage: (profile.photos && profile.photos[0]) ? profile.photos[0].value : 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        }
        try {
            let user = await User.findOne({googleId: profile.id})
            if(user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
            
        } catch(err) {
            console.log(err)
            done(err, null)
        }
    }
))

router.get('/auth/google', (req, res, next) => {
    if (req.user) {
        return res.redirect('/dashboard');
    }
    next();
}, passport.authenticate('google', { scope: ["email", "profile"] }))

router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login-fail',
        successRedirect: '/dashboard'
    })
)

router.get('/login-fail', (req, res) => {
    res.send('Something went wrong...')
})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if(err) {
            console.log(err)
            res.send('Error loggin out')
        }
        res.redirect('/')
    })
})

passport.serializeUser(function(user, done) {
    done(null, user.id || user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
      const userId = (id && typeof id === 'object') ? (id._id || id.id) : id;
      const user = await User.findById(userId);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

module.exports = router