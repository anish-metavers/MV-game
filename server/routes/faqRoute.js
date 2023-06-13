const express = require('express');
const router = express.Router();
const { varifyJwtToken } = require('../middlewares/jwtValidator');
const faqController = require('../controllers/faqController');
const { validateNewFaqCategory } = require('../middlewares/faqValidator');

// API => GET
router.get('/get-all-faq-categories', varifyJwtToken, faqController.getAllFaqCategories);

// API => POST
router.post('/create-new-faq-category', varifyJwtToken, validateNewFaqCategory, faqController.createNewFaqCategory);

// API => PATCH

// API => DELETE

module.exports = router;
