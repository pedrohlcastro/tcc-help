import UserController from '../../../controllers/user';
describe('Controllers: User', () => {
    describe('Get all users: getAll()', () => {
        it('should return a list of users', () => {
            const User = {
                findAll: td.function()
            };
            const expectedResponse = [{
                id: 1,
                name: 'admin',
                email: 'admin@admin.br',
                password: '12345',
                type: 0,
                validate_professor: 0,
                profile_image_path: 'path'
            }];
            td.when(User.findAll({})).thenResolve(expectedResponse);
            const userController = new UserController(User);
            return userController.getAll()
                .then(response => expect(response).to.be.eql(expectedResponse));
        });
    });
});