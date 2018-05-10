import db from '../config/db';

class StudentProfessorController {
  constructor() {
    this.Union = db().models.StudentProfessor;
    this.User = db().models.User;
  }

  get(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        this.User.findOne({ where: params })
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.User.findAll({})
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }
}

export default new StudentProfessorController();
