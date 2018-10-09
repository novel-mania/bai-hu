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
  editors: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: editors',
  },
  volume: {
    exists: true,
    in: 'body',
    errorMessage: 'Property must be passed: volume',
  },
});
