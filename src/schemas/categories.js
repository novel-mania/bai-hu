import { checkSchema } from 'express-validator/check';

export default checkSchema({
  name: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: name',
  },
});
