import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaChapters from '../schemas/chapters';
import validatorMiddleware from '../middlewares/validator';
import Chapters from '../models/chapters';
import Novels from '../models/novels';
import ChaptersController from '../controllers/chapters';

const router = express.Router();
const chaptersController = new ChaptersController(Novels, Chapters);

router.route('/')
  .get((req, res) => {
    const { query: { novel } } = req;
    chaptersController.get(novel)
      .then(chapters => res.send(chapters))
      .catch(err => res.status(400).send(err.message));
  });

router.route('/:id')
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
  .patch((req, res) => {
    const { params: { id } } = req;
    return chaptersController.update(id, req.body)
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
