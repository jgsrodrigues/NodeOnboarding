const express = require('express');
const router = express.Router();

router.get(
  '/profile',
  (req, res, next) => {
    // hardcoded 1 for test purposes
    if (req.query.id === '1') {
      res.json({
        user: {
          _id: 1,
          email: 'email1',
        }
      })
    } else {
      res.json({
        message: 'You made it to the secure route',
        user: req.user,
        token: req.query.secret_token
      })
    }
  }
);

module.exports = router;
