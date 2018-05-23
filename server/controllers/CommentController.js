import db from '../config/db';

class CommentController {
  constructor() {
    this.Comment = db().models.Comment;
    this.Tcc = db().models.Tcc;
    this.User = db().models.User;
    this.StudentProfessor = db().models.StudentProfessor;
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.Comment.create(data)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  get(params) {
    const queryParams = {
      where: params,
      /*eslint-disable */
      include: [{
        model: this.Tcc,
        as: 'CommentTcc',
        attributes: ['id', 'student_professor_id'],
        required: false,
      }],
      include: [{
        model: this.User,
        as: 'CommentUser',
        attributes: ['name', 'email'],
        required: false,
      }],
      /*eslint-enabled */
      raw: true,
    };
    return new Promise((resolve, reject) => {
      if (params) {
        this.Comment.findAll(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Comment.findAll(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Comment.destroy({ where: { id } })
        .then((result) => {
          if (result) {
            resolve({ status: 'Success' });
          } else {
            reject(new Error('Error DB query'));
          }
        })
        .catch(err => reject(err));
    });
  }

  update(data, id) {
    return new Promise((resolve, reject) => {
      this.Comment.update(data, { where: { id } })
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


export default new CommentController();
