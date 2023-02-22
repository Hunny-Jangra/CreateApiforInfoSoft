const userController = require('../controller/usercontroller');
const authController = require('../controller/authController');
const express = require('express');

const router = express.Router();

router
    .route('/Create/UserData')
    .post(authController.signup);

router
    .route('/Get/GetUserData')
    .get(authController.protect,userController.getUserData);

router  
    .route('/getAll/UserData')
    .get(authController.protect, userController.getAllUSerData);

router
    .route('/delete/UserData')
    .delete(authController.protect, userController.deleteUser);

module.exports = router;