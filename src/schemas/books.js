import { checkSchema } from 'express-validator/check';

export default checkSchema({
  name: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: name',
  },
  alternatives_titles: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: alternatives titles',
  },
  authors: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: authors',
  },
  slug: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: slug',
  },
  type: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: type',
  },
  cover: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: cover',
  },
  sinopse: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: sinopse',
  },
  categories: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: categories',
  },
  advisory_rating: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: advisory_rating',
  },
});
