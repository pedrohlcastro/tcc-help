import { Router } from 'express';
import passport from 'passport';

import ProfessorListController from '../controllers/ProfessorListController';

const router = new Router();

router.get('/:student_id', passport.authenticate('BasicBearer', { session: false }), ((req, res, next) => {
  ProfessorListController.getByUser(req.params.student_id)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.get('/already_associate/:student_id', passport.authenticate('BasicBearer', { session: false }), ((req, res, next) => {
  ProfessorListController.alreadyAssociate(req.params)
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

router.get('/', passport.authenticate('BasicBearer', { session: false }), ((req, res, next) => {
  ProfessorListController.getAll()
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
}));

router.post('/', passport.authenticate('BasicBearer', { session: false }), ((req, res, next) => {
  ProfessorListController.create(req.body)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: err.message, status: 500 }));
}));

router.put('/:student_id/:professor_id', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  ProfessorListController.remove(req.body, req.params)
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
