import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaPosts from '../schemas/posts';
import validatorMiddleware from '../middlewares/validator';
import PostsController from '../controllers/posts';
import Posts from '../models/posts';

const router = express.Router();
const postsController = new PostsController(Posts);

router.route('/')
  .get((req, res) =>
    postsController.get()
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaPosts, validatorMiddleware, (req, res) =>
    postsController.create(matchedData(req))
      .then(posts => res.status(201).send(posts))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return postsController.getById(id)
      .then(posts => res.send(posts))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaPosts, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return postsController.update(id, matchedData(req))
      .then(posts => res.status(200).send(posts))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return postsController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
