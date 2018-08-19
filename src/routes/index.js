import express from 'express';
import authenticationRoute from './auth';
import categoriesRoute from './categories';
import novelsRoute from './novels';
import usersRoute from './users';
import postsRoute from './posts';
import marksRoute from './marks';
import chaptersRoute from './chapters';

export default (app) => {
  const router = express.Router();

  router.use('/categories', categoriesRoute);
  router.use('/novels', novelsRoute);
  router.use('/chapters', chaptersRoute);
  router.use('/auth', authenticationRoute);
  router.use('/users', usersRoute);
  router.use('/posts', postsRoute);
  router.use('/marks', marksRoute);
  router.get('/', (req, res) => {
    res.json({ msg: 'Plataforma Novel Mania' });
  });

  app.use(router);
};

