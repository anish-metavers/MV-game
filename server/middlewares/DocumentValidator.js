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
      .withMessage('user role is must be string'),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];

exports.gameProviderDocValidation = [
   body('providerName', 'Game provider name is required')
      .isString()
      .withMessage('Game provider name must be string'),
   body('email', 'please enter valid email')
      .isEmail()
      .trim()
      .isLength({ min: 5 })
      .normalizeEmail(),
   (req, res, next) => {
      validateErrors(req, res, next);
   },
];
