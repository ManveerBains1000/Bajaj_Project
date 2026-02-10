const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  const OFFICIAL_EMAIL = req.app.locals.OFFICIAL_EMAIL;
  try {
    return res.status(200).json({
      is_success: true,
      official_email: OFFICIAL_EMAIL
    });
  } catch (error) {
    return res.status(500).json({
      is_success: false,
      official_email: OFFICIAL_EMAIL
    });
  }
});

module.exports = router;
