const { body } = require('express-validator');
const { validateErrors } = require('../helper/helper');

exports.validateNewFaqCategory = [
   body('heading', 'Heading is required')
      .isString()
      .withMessage('Name must be string')
      .isLength({ min: 2 })
      .withMessage('heading min length 2 required'),
   body('isShow', 'isShow is reuqired field').not().isString().withMessage('isShow type must be boolean').isBoolean(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];
