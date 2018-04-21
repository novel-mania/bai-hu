import { validationResult } from 'express-validator/check';

export default (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors.mapped());
  }
  return next();
};
