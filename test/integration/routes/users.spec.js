import Users from '../../../src/models/users';

describe('Routes: Users', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934cb';
  const defaultUser = {
    name: 'user name',
    profile_photo: 'user photo',
    email: 'user@email.com',
    password: 'userpassword',
    books: [],
    posts: [],
    marks: [],
    role: '56cb91bdc3464f14678934dd',
  };
  const expectedUser = {
    id: defaultId,
    name: 'user name',
    profile_photo: 'user photo',
    email: 'user@email.com',
    books: [],
    posts: [],
    marks: [],
    role: '56cb91bdc3464f14678934dd',
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const user = new Users(defaultUser);
    /* eslint-disable-next-line no-underscore-dangle */
    user._id = '56cb91bdc3464f14678934cb';
    return Users.remove({})
      .then(() => user.save());
  });

  afterEach(() => Users.remove({}));

  describe('GET /users', () => {
    it('should return a list of users', (done) => {
      request
        .get('/users')
        .expect({ data: [expectedUser] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one user', (done) => {
        request
          .get(`/users/${defaultId}`)
          .expect(200)
          .expect({ data: expectedUser }, done);
      });
    });
  });

  describe('POST /users', () => {
    context('when usering a user', () => {
      it('should return a new user with status code 201', (done) => {
        request
          .post('/users')
          .send(defaultUser)
          .expect(201)
          .end((err, res) => {
            const newUser = Object.assign({}, expectedUser);
            newUser.id = res.body.data.id;
            expect(res.body.data).to.be.eql(newUser);
            done(err);
          });
      });
    });
  });

  describe('PUT /users/:id', () => {
    context('when editing a user', () => {
      it('should update the user and return 200 as status code', (done) => {
        const customUser = {
          name: 'new username',
          profile_photo: 'user photo',
          email: 'user@email.com',
          password: 'userpassword',
          books: [],
          posts: [],
          marks: [],
          role: '56cb91bdc3464f14678934dd',
        };

        request
          .put(`/users/${defaultId}`)
          .send(customUser)
          .expect(200)
          .expect({ data: expectedUser }, done);
      });
    });
  });

  describe('DELETE /users/:id', () => {
    context('when deleting a user', () => {
      it('should delete a user and return 204 as status code', (done) => {
        request
          .delete(`/users/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
