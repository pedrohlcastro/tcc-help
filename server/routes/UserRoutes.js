import { Router } from 'express';

import UserController from '../controllers/UserController';

const router = new Router();

router.route('/')
  .get((req, res, next) => {
    UserController.getAll()
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .post((req, res, next) => {
    UserController.create(req.body)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

router.route('/:id')
  .get((req, res, next) => {
    UserController.getById(req.params)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .put((req, res, next) => {
    UserController.update(req.body, req.params)
      .then(result => res.json(result))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  })
  .delete((req, res, next) => {
    UserController.delete(req.params)
      .then(() => res.sendStatus(204))
      .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
  });

export default router;
