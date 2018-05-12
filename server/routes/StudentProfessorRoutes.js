import { Router } from 'express';
import passport from 'passport';

import StudentProfessorController from '../controllers/StudentProfessorController';

const router = new Router();

router.get('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  StudentProfessorController.get({ id: userId })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.put('/', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const myid = req.body.id;
  const myflag = req.body.flag;

  StudentProfessorController.update(myid, myflag)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});
export default router;
