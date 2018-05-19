import express from 'express';
import categoriesRoute from './categories';
import booksRoute from './books';

const router = express.Router();

router.use('/categories', categoriesRoute);
router.use('/books', booksRoute);
router.get('/', (req, res) => {
  res.json({ msg: 'Plataforma Novel Mania' });
});

export default router;
