const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const AppleStrategy = require('passport-apple').Strategy;
const session = require('express-session');
const config = require('./config/config');

const apiRoutes = require('./routes/api');
const authenticationController = require('./controllers/authenticationController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: 'polyglottvoice', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(config.dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new GoogleStrategy({
    clientID: config.googleAuthClientId,
    clientSecret: config.googleAuthClientSecret,
    callbackURL: "/auth/google/callback"
}, authenticationController.googleAuthCallback));

passport.use(new AppleStrategy({
    clientID: config.appleAuthClientId,
    teamID: config.appleAuthTeamId,
    callbackURL: "/auth/apple/callback",
    keyID: config.appleAuthKeyId,
    privateKeyLocation: config.appleAuthKeyLocation
}, authenticationController.appleAuthCallback));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

app.use('/api', apiRoutes);

app.listen(config.port, () => {
    console.log(`Server is running on port ${config.port}`);
});