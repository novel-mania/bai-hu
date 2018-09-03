import express from 'express';
import { matchedData } from 'express-validator/filter';
import schemaRoles from '../schemas/roles';
import validatorMiddleware from '../middlewares/validator';
import RolesController from '../controllers/roles';
import Roles from '../models/roles';

const router = express.Router();
const rolesController = new RolesController(Roles);

router.route('/')
  .get((req, res) =>
    rolesController.get()
      .then(roles => res.send(roles))
      .catch(err => res.status(400).send(err.message)))
  .post(schemaRoles, validatorMiddleware, (req, res) =>
    rolesController.create(matchedData(req))
      .then(roles => res.status(201).send(roles))
      .catch(err => res.status(400).send(err.message)));

router.route('/:id')
  .get((req, res) => {
    const { params: { id } } = req;
    return rolesController.getById(id)
      .then(roles => res.send(roles))
      .catch(err => res.status(400).send(err.message));
  })
  .put(schemaRoles, validatorMiddleware, (req, res) => {
    const { params: { id } } = req;
    return rolesController.update(id, matchedData(req))
      .then(roles => res.status(200).send(roles))
      .catch(err => res.status(400).send(err.message));
  })
  .delete((req, res) => {
    const { params: { id } } = req;
    return rolesController.remove(id)
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  });

export default router;
