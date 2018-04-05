import db from '../config/db';

class UserController {
  constructor() {
    this.User = db().models.User;
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.User.findAll({})
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
}

export default new UserController();
