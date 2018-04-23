import jwt from 'jsonwebtoken';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import bcrypt from 'bcrypt';
import db from '../config/db';
import config from '../config/config.json';

class UserController {
  constructor() {
    this.User = db().models.User;
    this.smtpTransport = nodemailer.createTransport({
      service: config.email_service,
      auth: {
        user: config.email,
        pass: config.email_password,
      },
    });

    this.handlebarsOptions = {
      viewEngine: 'handlebars',
      viewPath: path.resolve('./server/templates/'),
      extName: '.html',
    };
  }


  getAll() {
    return new Promise((resolve, reject) => {
      this.User.findAll({})
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  getById(params) {
    return new Promise((resolve, reject) => {
      this.User.findOne({ where: params })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      this.User.create(data)
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  update(data, params) {
    return new Promise((resolve, reject) => {
      this.User.update(data, {
        where: params,
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }

  delete(params) {
    return new Promise((resolve, reject) => {
      this.User.destroy({
        where: params,
      })
        .then(result => resolve(result))
        .catch(err => reject(err));
    });
  }
/* eslint-disable */
  signIn(err, users, info) {
    return new Promise((resolve, reject) => {
      if (err) {
        reject(err);
      }
      if (!users) {
        reject(new Error(info));
      }
      const payload = {
        id: users.id,
      };
      const options = {
        expiresIn: '1d',
      };
      let token = 'Bearer ';
      token += jwt.sign(payload, config.jwtSecret, options);
      resolve({ result: 'Success', token, type: users.type });
    });
  }

  checkToken(users) {
    return new Promise((resolve, reject) => {
      if (users) {
        const resJSON = {
          result: 'Success',
          type: users.type,
        };
        resolve(resJSON);
      }
      reject(new Error('Unauthorized'));
    });
  }
  /* eslint-enable */

  forgotPassword(req) {
    return new Promise((resolve, reject) => {
      this.User.findOne({ where: { email: req.email } })
        .then((result) => {
          if (!result) { reject(new Error('User not found')); } else {
            this.smtpTransport.use('compile', hbs(this.handlebarsOptions));
            const payload = {
              id: result.id,
            };
            const options = {
              expiresIn: '1d',
            };

            const token = jwt.sign(payload, config.jwtSecretForgotPassword, options);
            const data = {
              to: req.email,
              from: `"${config.project_name}" <${config.email}>`,
              template: 'forgot-password-email',
              subject: 'TCC Help - Recuperação de senha',
              context: {
                url: `http://localhost:4200/reset-password/${token}`,
                name: result.name,
              },
            };

            this.smtpTransport.sendMail(data)
              .then(() => resolve({ msg: 'Email sent', status: 200 }))
              .catch(er => reject(er));
          }
        })
        .catch(err => reject(err));
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      if (data.password === data.confirmPassword) {
        const payload = jwt.decode(data.token, config.jwtSecretForgotPassword);
        if (payload) {
          const salt = bcrypt.genSaltSync();
          const encriptedPassword = bcrypt.hashSync(data.password, salt);
          const userPassword = {
            password: encriptedPassword,
          };
          this.User.update(userPassword, {
            where: { id: payload.id },
          })
            .then(() => resolve({ msg: 'Password was changed', status: 200 }))
            .catch(err => reject(err));
        } else {
          reject(new Error('Error'));
        }
      } else {
        reject(new Error('Password and Confirm Password does not match'));
      }
    });
  }
}

export default new UserController();
