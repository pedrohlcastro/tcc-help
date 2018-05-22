import jwt from 'jsonwebtoken';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import bcrypt from 'bcrypt';
import db from '../config/db';
import config from '../config/config.json';

class CommentsController {
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

      
}



export default new CommentController();