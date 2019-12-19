const express = require('express');
const router = express.Router();

const { create } = require('../controllers/blog');
const { requireSignin, adminMiddleware } = require('../controllers/auth');


router.post('/blog', requireSignin, adminMiddleware, create);
// router.get('/categories', time);
// router.get('/blog/:slug', time);
// router.delete('/blog/:slug', time);

module.exports = router;