import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaBooks from '../schemas/books';
import validatorMiddleware from '../middlewares/validator';
import NovelsController from '../controllers/novels';
import Novels from '../models/novels';

const router = express.Router();
const novelsController = new NovelsController(Novels);

router.route('/')
  .get((req, res) =>
    novelsController.get()
      .then(books => res.send(books))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaBooks, validatorMiddleware, (req, res) =>
    novelsController.create(matchedData(req))
      .then(book => res.status(201).send(book))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return novelsController.getById(id)
      .then(book => res.send(book))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaBooks, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return novelsController.update(id, matchedData(req))
      .then(book => res.status(200).send(book))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return novelsController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;

