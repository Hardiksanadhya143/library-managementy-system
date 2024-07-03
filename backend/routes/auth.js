// routes/auth.js
const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
  // Clear the user session or token
  res.clearCookie('token'); // Assuming you're using cookies for session management
  res.status(200).send({ message: 'Logged out successfully' });
});

module.exports = router;
