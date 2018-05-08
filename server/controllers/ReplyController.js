import db from '../config/db';

class ReplyController {
  constructor() {
    this.Reply = db().models.Reply;
    this.User = db().models.User;
  }
  create(userId, topicId, data) {
    const newReply = data;
    newReply.user_id = userId;
    newReply.topic_id = topicId;
    return new Promise((resolve, reject) => {
      this.Reply.create(newReply)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  get(params) {
    const queryParams = {
      where: params,
      include: [{
        model: this.User,
        as: 'ReplyUser',
        attributes: ['name', 'email', 'type', 'validate_professor'],
      }],
    };
    return new Promise((resolve, reject) => {
      if (params) {
        this.Reply.findAll(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Reply.findAll(queryParams)
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Reply.destroy({ where: { id } })
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
      this.Reply.update(data, { where: { id } })
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

export default new ReplyController();
