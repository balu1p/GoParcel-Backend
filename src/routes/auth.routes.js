const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { uploads } = require('../middleware/multer');

const router = express.Router();

router.post("/signup", uploads.single('profileImg'), registerUser);
router.post("/login", loginUser);

module.exports = router;