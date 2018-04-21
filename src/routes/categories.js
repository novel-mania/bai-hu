import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaCategories from '../schemas/categories';
import validatorMiddleware from '../middlewares/validator';
import CategoriesController from '../controllers/categories';
import Categories from '../models/categories';

const router = express.Router();
const categoriesController = new CategoriesController(Categories);

router.route('/')
  .get((req, res) =>
    categoriesController.get()
      .then(categories => res.send(categories))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaCategories, validatorMiddleware, (req, res) =>
    categoriesController.create(matchedData(req))
      .then(category => res.status(201).send(category))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return categoriesController.getById(id)
      .then(category => res.send(category))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaCategories, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return categoriesController.update(id, matchedData(req))
      .then(category => res.status(200).send(category))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return categoriesController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
