class UserController {
  constructor(User) {
    this.User = User;
  }

  getAll() {
    return this.User.findAll({})
      .then(result => result);
  }
}

export default UserController;
