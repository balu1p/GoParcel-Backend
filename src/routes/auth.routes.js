const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.controller');
const { uploads } = require('../middleware/multer');
const { userAuth } = require("../middleware/auth.middleware");  
const { addProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');

const router = express.Router();

//login
router.post("/signup", uploads.single('profileImg'), registerUser);
router.post("/login", loginUser);

//Product
router.post("/create-product", userAuth, addProduct); 
router.put("/update-product", userAuth, updateProduct);
router.delete("/delete-product", userAuth, deleteProduct);

module.exports = router;
