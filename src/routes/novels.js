import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaChapters from '../schemas/chapters';
import schemaBooks from '../schemas/books';
import validatorMiddleware from '../middlewares/validator';
import ChaptersController from '../controllers/chapters';
import NovelsController from '../controllers/novels';
import Chapters from '../models/chapters';
import Novels from '../models/novels';

const router = express.Router();

const chaptersController = new ChaptersController(Novels, Chapters);
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
  .patch((req, res) => {
    const { params: { id } } = req;
    return novelsController.update(id, req.body)
      .then(book => res.status(200).send(book))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return novelsController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

router.route('/:novel/chapters')
  .post(schemaChapters, validatorMiddleware, (req, res) => {
    const { params: { novel } } = req;
    chaptersController.create(novel, matchedData(req))
      .then(chapters => res.status(201).send(chapters))
      .catch(err => res.status(400).send(err.message))
  });


export default router;

