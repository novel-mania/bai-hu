import express from 'express';
import authenticationRoute from './auth';
import categoriesRoute from './categories';
import booksRoute from './books';
import usersRoute from './users';
import postsRouter from './posts';
import marksRoute from './marks';

export default (app) => {
  const router = express.Router();

  router.use('/categories', categoriesRoute);
  router.use('/books', app.auth.authenticate(), booksRoute);
  router.use('/auth', authenticationRoute);
  router.use('/users', usersRoute);
router.use('chapters', postsRouter);
router.use('/marks', marksRoute);
  router.get('/', (req, res) => {
    res.json({ msg: 'Plataforma Novel Mania' });
  });

  app.use(router);
};

