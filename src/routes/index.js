import express from 'express';
import categoriesRoute from './categories';

const router = express.Router();

router.use('/categories', categoriesRoute);
router.get('/', (req, res) => {
  res.json({ msg: 'Plataforma Novel Mania' });
});

export default router;
