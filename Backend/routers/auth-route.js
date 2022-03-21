const Router = require('express');
const router = new Router();
const authController = require('../controllers/auth-controller.js')

router.post('/sign-in', authController.signIn);

module.exports = router;