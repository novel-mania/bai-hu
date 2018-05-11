import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaUsers from '../schemas/users';
import validatorMiddleware from '../middlewares/validator';
import UsersController from '../controllers/users';
import Users from '../models/users';

const router = express.Router();
const usersController = new UsersController(Users);

router.route('/')
  .get((req, res) =>
    usersController.get()
      .then(users => res.send(users))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaUsers, validatorMiddleware, (req, res) =>
    usersController.create(matchedData(req))
      .then(user => res.status(201).send(user))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return usersController.getById(id)
      .then(user => res.send(user))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaUsers, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return usersController.update(id, matchedData(req))
      .then(user => res.status(200).send(user))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return usersController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
