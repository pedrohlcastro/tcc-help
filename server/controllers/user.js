import db from '../config/db';
class UserController {
  constructor() {
    this.User = db().models.User;
  }
  
  getAll() {
    return this.User.findAll({})
      .then(result => result);
  }
}

export default UserController;
