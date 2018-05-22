import db from '../config/db';

class CommentController {
  constructor() {
    this.Comment = db().models.Comment;
    this.User = db().models.Comment;
  }

  create(userId, tccId, data) {
    const newComment = data;
    newComment.user_id = userId;
    newComment.tcc_id = tccId;
    return new Promise((resolve, reject) => {
      this.Comment.create(newComment)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  get(params) {
    const queryParams = {
      where: params,
      include: [{
        model: this.User,
        as: 'Comment',
        attributes: ['name', 'email', 'type', 'validate_professor'],
      }],
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
