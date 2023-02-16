const { body } = require('express-validator');
const { validateErrors } = require('../helper/helper');

exports.currencyValidator = [
   body('currencyName', 'currency name is required')
      .isString()
      .withMessage('currency Name must be string')
      .isLength({ min: 2 })
      .withMessage('currency name min length 2 required'),
   body('locked', 'currency locked status required')
      .not()
      .isString()
      .withMessage('locked type must be boolean')
      .isBoolean(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

exports.userRoleValidator = [
   body('roleName', 'user role name is required')
      .isString()
      .withMessage('role name is must be string'),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];
