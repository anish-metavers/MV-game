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
router.get(
   '/get-single-currency-payment-method',
   varifyJwtToken,
   paymentController.getSinglePaymentCurrencyOption
);
router.get(
   '/get-all-payment-option-list',
   varifyJwtToken,
   paymentController.getAllPaymentOptionList
);
router.get(
   '/get-all-fiat-transactions',
   varifyJwtToken,
   paymentController.getAllFiatTransactions
);
router.get(
   '/get-single-order-info',
   varifyJwtToken,
   paymentController.getSingleOrderInfo
);

// API => POST
router.post(
   '/insert-new-currency-payment-options',
   varifyJwtToken,
   upload.single('image'),
   paymentController.insertNewCurrencyPaymentOption
);

// API => PATCH
router.patch(
   '/update-single-payment-option',
   varifyJwtToken,
   upload.single('image'),
   paymentController.updatePaymentOption
);

// API => DELETE

module.exports = router;
