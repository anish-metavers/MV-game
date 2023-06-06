const exporess = require('express');
const router = exporess.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const userManagementController = require('../controllers/userManagementController');
const { createPlayerAccount } = require('../middlewares/userManagementValidator');

// API => GET
router.get('/get-single-user-account', varifyJwtToken, userManagementController.getUserSingleAccount);

// API => POST
router.post('/create-player-account', varifyJwtToken, createPlayerAccount, userManagementController.createPlayerAccount);

// API => PATCH
router.patch('/update-player-account', varifyJwtToken, createPlayerAccount, userManagementController.updatePlayerAccount);
router.patch('/set-account-password', varifyJwtToken, userManagementController.setAccountPassword);

// API => DELETE

module.exports = router;
