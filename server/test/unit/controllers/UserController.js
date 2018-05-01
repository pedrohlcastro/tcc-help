import jwt from 'jsonwebtoken';
import RuleController from '../../../controllers/RuleController';
import UserController from '../../../controllers/UserController';
import config from '../../../config/config.json';

describe('Controller: User', () => {
  const defaultUser = {
    id: 1,
    name: 'admin',
    email: 'gustavo.marques2011@gmail.com',
    password: '123456',
    type: 0,
    validate_professor: 0,
    profile_image_path: 'path',
  };
  before(async () => {
    try {
      await RuleController.Rule.destroy({ where: {} });
      await UserController.User.destroy({ where: {} });
      //await UserController.User.create(defaultUser);
      // done();
    } catch (err) {
      /*eslint-disable */
      console.log(err);
      /* eslint-enable */
    }
  });

  it('should create a user', (done) => {
    UserController.create(defaultUser)
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a list of users', (done) => {
    UserController.getAll()
      .then((response) => {
        expect(response.length).to.be.eql(1);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a user', (done) => {
    UserController.getById({ id: 1 })
      .then((response) => {
        expect(response.name).to.be.eql(defaultUser.name);
        expect(response.email).to.be.eql(defaultUser.email);
        expect(response.type).to.be.eql(defaultUser.type);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  let updatedUser = {
    name: 'Update user'
  }

  it('should update a user', (done) => {
    UserController.update(updatedUser, { id: 1 })
      .then((response) => {
        expect(response.status).to.be.eql(200);
        UserController.getById({ id: 1 })
          .then((res) => {
            expect(res.name).to.be.eql(updatedUser.name);
            done();
          })
          .catch((err) => {
            done(`Catch was called: ${err}`);
          });
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should return a token', (done) => {
    UserController.signIn(null, defaultUser, null)
      .then((response) => {
        expect(response.result).to.be.eql('Success');
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should check the token', (done) => {
    UserController.checkToken(defaultUser)
      .then((response) => {
        expect(response.result).to.be.eql('Success');
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  // it('should send an email', (done) => {
  //   UserController.forgotPassword(defaultUser)
  //     .then(async (response) => {
  //       await expect(response.status).to.be.eql(200);
  //       done();
  //     })
  //     .catch((err) => {
  //       done(`Catch was called: ${err}`);
  //     });
  // });

  const payload = {
    id: defaultUser.id,
  };
  const options = {
    expiresIn: '1d',
  };

  const token = jwt.sign(payload, config.jwtSecretForgotPassword, options);

  it('should reset the password', (done) => {
    let data = {
      password: '654321',
      confirmPassword: '654321',
      token: token,
    }
    UserController.resetPassword(data)
      .then((response) => {
        expect(response.status).to.be.eql(200);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });

  it('should delete a user', (done) => {
    UserController.delete({ id: 1 })
      .then((response) => {
        expect(response.status).to.be.eql(200);
        UserController.getById({id: 1})
          .then((user) => {
            expect(user).to.be.eql(null);
            done();
          })
          .catch((err) => {
            done(`Catch was called: ${err}`);
          });
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });
});
