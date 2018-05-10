import { Router } from 'express';

import AssociateController from '../controllers/AssociateController';

const router = new Router();

router.get('/:student_id/:professor_id', ((req, res, next) => {
  AssociateController.get(req.params)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.get('/', ((req, res, next) => {
  AssociateController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.post('/', ((req, res, next) => {
  AssociateController.create(req.body)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: err.message, status: 500 }));
}));


export default router;
