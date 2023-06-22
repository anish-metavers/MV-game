const express = require('express');
const router = express.Router();
const liveSupportController = require('../controllers/liveSupportController');
const { varifyJwtToken } = require('../middlewares/jwtValidator');

// API => GET
router.get('/get-all-query-users-list', varifyJwtToken, liveSupportController.getAllQueryUserLists);
router.get('/get-query-users-lists', varifyJwtToken, liveSupportController.getQueryUsersLists);

// API => POST

// API => PATCH
router.patch('/updated-user-query', varifyJwtToken, liveSupportController.updatedUserQuery);

// API => DELETE
module.exports = router;
