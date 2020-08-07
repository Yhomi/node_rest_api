const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/Auth');
const auth = require('../middleware/auth');


router.get('/',AuthController.getAllUser);

router.post('/signup',AuthController.register);

router.post('/login',AuthController.login);

// delete a user
router.delete('/:userId',auth,AuthController.deleteUser)

module.exports = router;
