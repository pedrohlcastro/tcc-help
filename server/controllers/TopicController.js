import db from '../config/db';

class TopicController {
  constructor() {
    this.Topic = db().models.Topic;
  }
  create(userId, data) {
    const newTopic = data;
    newTopic.user_id = userId;
    return new Promise((resolve, reject) => {
      this.Topic.create(newTopic)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  get(params) {
    return new Promise((resolve, reject) => {
      if (params) {
        this.Topic.findOne({ where: params })
          .then(res => resolve(res))
          .catch(err => reject(err));
      } else {
        this.Topic.findAll({})
          .then(res => resolve(res))
          .catch(err => reject(err));
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.Topic.destroy({ where: { id } })
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
      this.Topic.update(data, { where: { id } })
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

export default new TopicController();
