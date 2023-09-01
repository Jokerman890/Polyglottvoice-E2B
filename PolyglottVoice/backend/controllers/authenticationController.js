const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json(info);
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.status(200).json({ message: 'loginSuccess', user: user });
    });
  })(req, res, next);
});

router.post('/google', passport.authenticate('googleToken', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  res.status(200).json({ message: 'loginSuccess', user: req.user });
});

router.post('/apple', passport.authenticate('appleToken', { session: false }), (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'User not authenticated' });
  }
  res.status(200).json({ message: 'loginSuccess', user: req.user });
});

module.exports = router;