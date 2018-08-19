import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaChapters from '../schemas/chapters';
import validatorMiddleware from '../middlewares/validator';
import ChaptersController from '../controllers/chapters';
import NovelsController from '../controllers/novels';
import Chapters from '../models/chapters';
import Novels from '../models/novels';

const router = express.Router();
const chaptersController = new ChaptersController(Novels, Chapters);

router.route('/')
  .get((req, res) => {
    const { query: { novel } } = req;
    chaptersController.get(novel)
      .then(chapters => res.send(chapters))
      .catch(err => res.status(400).send(err.message));
  })
  .post(schemaChapters, validatorMiddleware, (req, res) => {
    const { params: { novel } } = req;
    chaptersController.create(novel, matchedData(req))
      .then(chapters => res.status(201).send(chapters))
      .catch(err => res.status(400).send(err.message))
  });

router.route('/:novel/chapters/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return chaptersController.getById(id)
      .then(chapter => res.send(chapter))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaChapters, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return chaptersController.update(id, matchedData(req))
      .then(chapter => res.status(200).send(chapter))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return chaptersController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
