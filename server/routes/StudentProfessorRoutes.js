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
  const myId = req.body.id;
  const myAcceptFlag = req.body.acceptFlag;
  const myActivateFlag = req.body.activateFlag;

  StudentProfessorController.update(myId, myAcceptFlag, myActivateFlag)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});


export default router;
