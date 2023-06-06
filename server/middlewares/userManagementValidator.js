const { body } = require('express-validator');
const { validateErrors } = require('../helper/helper');

exports.createPlayerAccount = [
   body('name', 'name is required')
      .isString()
      .withMessage('Name must be string')
      .isLength({ min: 2 })
      .withMessage('name min length 2 required'),
   body('email', 'please enter valid email').isEmail().trim().isLength({ min: 5 }).normalizeEmail(),
   body('active', 'Account active status is reuqired!').not().isString().withMessage('active type must be boolean').isBoolean(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];
