const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Express MySQL Docker App' });
});

module.exports = router;
