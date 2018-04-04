// import UserController from '../controllers/user';

export default (app, User) => {
  app.route('/users')
    .get((req, res) => {
      User.findAll({})
        .then(result => res.json(result))
        .catch(() => res.sendStatus(412));
    })
    .post((req, res) => {
      User.create(req.body)
        .then(result => res.json(result))
        .catch(() => res.sendStatus(412));
    });

  app.route('/users/:id')
    .get((req, res) => {
      User.findOne({ where: req.params })
        .then(result => res.json(result))
        .catch(() => res.sendStatus(412));
    })
    .put((req, res) => {
      User.update(req.body, { where: req.params })
        .then(result => res.json(result))
        .catch(() => res.sendStatus(412));
    })
    .delete((req, res) => {
      User.destroy({ where: req.params })
        .then(() => res.sendStatus(204))
        .catch(() => res.sendStatus(412));
    });
};
