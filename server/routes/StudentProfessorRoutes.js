import { Router } from 'express';
import passport from 'passport';

import StudentProfessorController from '../controllers/StudentProfessorController';

const router = new Router();

router.get('/:id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.params.id;
  StudentProfessorController.get({ id: userId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  StudentProfessorController.get()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

export default router;
