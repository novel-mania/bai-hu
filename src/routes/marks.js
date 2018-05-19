import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaMarks from '../schemas/marks';
import validatorMiddleware from '../middlewares/validator';
import MarksController from '../controllers/marks';
import Marks from '../models/marks';

const router = express.Router();
const marksController = new MarksController(Marks);

router.route('/')
  .get((req, res) =>
    marksController.get()
      .then(marks => res.send(marks))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaMarks, validatorMiddleware, (req, res) =>
    marksController.create(matchedData(req))
      .then(marks => res.status(201).send(marks))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return marksController.getById(id)
      .then(marks => res.send(marks))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaMarks, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return marksController.update(id, matchedData(req))
      .then(marks => res.status(200).send(marks))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return marksController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
