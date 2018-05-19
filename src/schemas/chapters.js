import { checkSchema } from 'express-validator/check';

export default checkSchema({
  name: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: name',
  },
  chapter_num: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: chapter_num',
  },
  content: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: content',
  },
  translators: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: translators',
  },
  reviewers: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: reviewers',
  },
  volume: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: volume',
  },
  comments: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: comments',
  },
});
