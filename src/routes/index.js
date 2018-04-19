import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ msg: 'Plataforma Novel Mania' });
});

export default router;
