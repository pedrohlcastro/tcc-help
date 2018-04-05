import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = new Router();

router.route('/')
  .get((req, res, next) => {
    UserController.getAll()
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .post((req, res) => {
    UserController.User.create(req.body)
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  });

router.route('/:id')
  .get((req, res) => {
    UserController.User.findOne({ where: req.params })
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  })
  .put((req, res) => {
    UserController.User.update(req.body, { where: req.params })
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  })
  .delete((req, res) => {
    UserController.User.destroy({ where: req.params })
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(412));
  });

export default router;
