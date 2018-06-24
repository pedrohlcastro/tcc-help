import { Router } from 'express';
import passport from 'passport';
import path from 'path';

import TccController from '../controllers/TccController';

const router = new Router();

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

router.get('/getStatistics/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TccController.getStatistics(req.params.tccId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/access/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TccController.checkAccessRights(req.params.tccId, req.user.id)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'ACESSO NEGADO', status: 400 }));
});

router.get('/getRulesSpelling/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  TccController.getCheckRulesAndSpelling(req.params.tccId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.get('/getAllTcc', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => {
  const userId = req.user.id;
  TccController.getAllTccFromUserId(userId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

router.post('/getTccVisibleToProfessor', (req, res, next) => {
  const studentProfessorId = req.body.id;
  TccController.getAllTccFromStudentProfessorId(studentProfessorId)
    .then(data => res.json(data))
    .catch(err => next({ err, msg: 'Error running DB query', status: 500 }));
});

export default router;
