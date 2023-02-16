const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const {
   currencyValidator,
   userRoleValidator,
} = require('../middlewares/DocumentValidator');

// API => GET

// API => POST
router.post(
   '/insert-currency',
   currencyValidator,
   adminControllers.insertGamesCurrency
);
router.post(
   '/insert-new-user-role',
   userRoleValidator,
   adminControllers.insertNewUsersRole
);

module.exports = router;
