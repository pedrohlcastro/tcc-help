import { Router } from 'express';
import passport from 'passport';
import path from 'path';

import TccController from '../controllers/TccController';

const router = new Router();

router.get('/getTccs/:professorId/:studentId', (req, res, next) => {
  TccController.getTccs({
    professor_id: req.params.professorId,
    student_id: req.params.studentId,
  })
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error DB query', status: 500 }));
});

router.get('/spell/:language', (req, res, next) => {
  TccController.checkSpelling()
    .then(result => res.json(result))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/parseTxt/:fileName/:page', (req, res, next) => {
  TccController.pdf2Txt(path.join(__dirname, `../upload/${req.params.fileName}`))
    .then(data => res.json(data[req.params.page]))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/runRules/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  TccController.runProfessorRules(req.params.tccId, userId)
    .then(() => res.json({ result: 'Success' }))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.put('/sendToProfessor', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TccController.update(req.body.id, { visible_professor: 1 })
    .then(() => res.json({ result: 'Success' }))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/file/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => TccController.getFile(res, next, req.params.tccId));

router.get('/runSpelling/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  TccController.runSpelling(req.params.tccId, userId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.post('/runAnalisys/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  let professorId;
  if (req.user.type === 2) professorId = userId;
  TccController.runAnalisys(req.params.tccId, userId, req.body, professorId)
    .then(() => res.json({ result: 'Success', status: 200 }))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/getRulesSpelling/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TccController.getCheckRulesAndSpelling(req.params.tccId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
