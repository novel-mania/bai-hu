import { checkSchema } from 'express-validator/check';

export default checkSchema({
  users: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: users',
  },
  chapters: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: chapters',
  },
});
