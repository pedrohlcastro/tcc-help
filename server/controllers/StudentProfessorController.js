import db from '../config/db';

class StudentProfessorController {
  constructor() {
    this.StudentProfessor = db().models.StudentProfessor;
    this.User = db().models.User;
  }

  get(params) {
    const queryParams = {
      where: params,
      attributes: ['id', 'name', 'email', 'type'],
      include: [{
        model: this.User,
        as: 'UserProfessor',
        required: true,
        attributes: ['id', 'name', 'email'],
      }],
      raw: true,
    };

    return new Promise((resolve, reject) => {
      this.User.findAll(queryParams)
        .then((res) => {
          resolve(res);
        })
        .catch(err => reject(err));
    });
  }

  update(id, flag) {
    return new Promise((resolve, reject) => {
      this.StudentProfessor.update({ accept: flag }, { where: { id } })
        .then((result) => {
          if (result) {
            resolve({ status: 'Success' });
          } else {
            reject(new Error('Error DB query'));
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default new StudentProfessorController();
