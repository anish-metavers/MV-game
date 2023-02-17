const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminController');
const {
   currencyValidator,
   userRoleValidator,
} = require('../middlewares/DocumentValidator');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

// API => GET
router.get(
   '/get-all-user-rools',
   varifyJwtToken,
   adminControllers.getAllUserRoles
);
router.get(
   '/get-single-user-role',
   varifyJwtToken,
   adminControllers.getSingleUserRole
);

// API => POST
router.post(
   '/insert-currency',
   currencyValidator,
   varifyJwtToken,
   adminControllers.insertGamesCurrency
);
router.post(
   '/insert-new-user-role',
   userRoleValidator,
   varifyJwtToken,
   adminControllers.insertNewUsersRole
);

// API => PATCH
router.patch(
   '/update-single-role',
   userRoleValidator,
   varifyJwtToken,
   adminControllers.updateSingleRole
);

// API => DELETE
router.delete(
   '/delete-single-role',
   varifyJwtToken,
   adminControllers.deleteUserSingleRole
);

module.exports = router;
