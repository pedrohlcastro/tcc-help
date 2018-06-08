import { Router } from 'express';
import { v4 as uuid } from 'uuid';
import passport from 'passport';
import path from 'path';
import multer from 'multer';
import TccController from '../controllers/TccController';


const router = new Router();
const upload = multer({ dest: './server/upload/' });
router.get('/spell/:language', (req, res, next) => {
  TccController.checkSpelling(req.params)
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


router.post('/upload', passport.authenticate(
  'BasicBearer',
  { session: false },
), (req, res, next) => {
  if (!req.file) {
    console.log('No file received');
  }

  const name = `${uuid()}.pdf`;
  upload.single(name)
    .then(() => res.json({ result: 'Success' }))
    .catch(err => next({ err, msg: 'Error uploading file', status: 500 }));
  console.log('2');
});

router.get('/file/:tccId', passport.authenticate('BasicBearer', { session: false }), (req, res, next) => TccController.getFile(res, next, req.params.tccId));

export default router;

