import UserController from '../controllers/user';
var express = require('express');
var router = express.Router();
const UserCon = new UserController();

router.route('/')
  .get((req, res) => {
    UserCon.User.findAll({})
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  })
  .post((req, res) => {
    UserCon.User.create(req.body)
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  });

router.route('/:id')
  .get((req, res) => {
    UserCon.User.findOne({ where: req.params })
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  })
  .put((req, res) => {
    UserCon.User.update(req.body, { where: req.params })
      .then(result => res.json(result))
      .catch(() => res.sendStatus(412));
  })
  .delete((req, res) => {
    UserCon.User.destroy({ where: req.params })
      .then(() => res.sendStatus(204))
      .catch(() => res.sendStatus(412));
  });

module.exports = router;