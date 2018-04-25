import { checkSchema } from 'express-validator/check';

export default checkSchema({
  title: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: title',
  },
  content: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: content',
  },
  author: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: author',
  },
  book: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: book',
  },
  tags: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: tags',
  },
});
