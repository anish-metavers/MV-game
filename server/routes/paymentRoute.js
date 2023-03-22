const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const { upload } = require('../helper/helper');
const paymentController = require('../controllers/paymentController');

// API => GET
router.get(
   '/get-currency-payment-options',
   varifyJwtToken,
   paymentController.getCurrencyPaymentOptions
);

// API => POST
router.post(
   '/insert-new-currency-payment-options',
   varifyJwtToken,
   upload.single('image'),
   paymentController.insertNewCurrencyPaymentOption
);

// API => PATCH

// API => DELETE

module.exports = router;
