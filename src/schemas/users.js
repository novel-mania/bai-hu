import { checkSchema } from 'express-validator/check';

export default checkSchema({
  name: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: name',
  },
  profile_photo: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: profile_photo',
  },
  email: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: email',
  },
  role: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: role',
  },
});
