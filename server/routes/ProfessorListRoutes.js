import { Router } from 'express';

import ProfessorListController from '../controllers/ProfessorListController';

const router = new Router();

router.get('/:student_id', ((req, res, next) => {
  ProfessorListController.get(req.params)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.route('/invitation')
  .post((req, res, next) => {
    ProfessorListController.inviteProfessor(req.body)
      .then(result => res.json(result))
      .catch((err) => {
        next({ err, msg: err.message, status: 412 });
      });
  });

router.get('/', ((req, res, next) => {
  ProfessorListController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.post('/', ((req, res, next) => {
  ProfessorListController.create(req.body)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: err.message, status: 500 }));
}));


export default router;
