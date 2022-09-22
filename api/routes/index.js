const express = require('express');
const router = express.Router();



router.get('/', async (request, response, next) => {
  return response.json({
    message: 'Payout service is running'
  });
});

module.exports = router;
