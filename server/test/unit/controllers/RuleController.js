import RuleController from '../../../controllers/RuleController';
import UserController from '../../../controllers/UserController';

describe('Controllers: Rule', () => {
  const defaultRule = {
    id: 1,
    professor_id: 1,
    regex: 'abc',
    message: 'New Rule',
  };
  const defaultUser = {
    id: 1,
    name: 'admin',
    email: 'admin@admin.com',
    password: '12345',
    type: 0,
    validate_professor: 0,
    profile_image_path: 'path',
  };
  before(async () => {
    try {
      await RuleController.Rule.destroy({ where: {} });
      await UserController.User.destroy({ where: {} });
      await UserController.User.create(defaultUser);
      await RuleController.Rule.create(defaultRule);
      // done();
    } catch (err) {
      console.log(err);
    }
  });

  it('should create a rule', (done) => {
    const userId = 1;
    const newRule = {
      id: 2,
      professor_id: userId,
      regex: 'abc',
      message: 'New Rule',
    };
    RuleController.create(userId, newRule)
      .then((res) => {
        expect(res.dataValues).to.be.eql(newRule);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });
  it('should get a rule', (done) => {
    RuleController.get({ id: 1 })
      .then((res) => {
        expect(res).to.be.eql(defaultRule);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });
  it('should get all rules', (done) => {
    RuleController.get()
      .then((res) => {
        expect(res.length).to.be.eql(2);
        done();
      })
      .catch((err) => {
        done(`Catch was called: ${err}`);
      });
  });
  // it('should update a rule', (done) => {

  // });
  // it('should delete a rule', (done) => {

  // });
});
