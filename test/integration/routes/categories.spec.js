import Categories from '../../../src/models/categories';

describe('Routes: Categories', () => {
  let request;
  const defaultId = '56cb91bdc3464f14678934ca';
  const defaultCategory = {
    name: 'Xianxia',
  };
  const expectedCategory = {
    id: defaultId,
    name: 'Xianxia',
  };

  before(() => setupApp().then((app) => {
    request = supertest(app);
  }));

  beforeEach(() => {
    const category = new Categories(defaultCategory);
    /* eslint-disable-next-line no-underscore-dangle */
    category._id = '56cb91bdc3464f14678934ca';
    return Categories.remove({})
      .then(() => category.save());
  });

  afterEach(() => Categories.remove({}));

  describe('GET /categories', () => {
    it('should return a list of categories', (done) => {
      request
        .get('/categories')
        .expect({ data: [expectedCategory] }, done);
    });

    context('when an id is specified', () => {
      it('should return 200 with one category', (done) => {
        request
          .get(`/categories/${defaultId}`)
          .expect(200)
          .expect({ data: expectedCategory }, done);
      });
    });
  });

  describe('POST /categories', () => {
    context('when posting a category', () => {
      it('should return a new category with status code 201', (done) => {
        const newCategory = { name: 'Xianxia' };

        request
          .post('/categories')
          .send(newCategory)
          .expect(201)
          .end((err, res) => {
            expect(res.body.data.name).to.be.eql(newCategory.name);
            done(err);
          });
      });
    });
  });

  describe('PUT /categories/:id', () => {
    context('when editing a category', () => {
      it('should update the category and return 200 as status code', (done) => {
        const customCategory = {
          name: 'Updated Category',
        };
        const updatedCategory = Object.assign(
          {},
          { id: defaultId },
          customCategory,
          defaultCategory,
        );

        request
          .put(`/categories/${defaultId}`)
          .send(customCategory)
          .expect(200)
          .expect({ data: updatedCategory }, done);
      });
    });
  });

  describe('DELETE /categories/:id', () => {
    context('when deleting a category', () => {
      it('should delete a category and return 204 as status code', (done) => {
        request
          .delete(`/categories/${defaultId}`)
          .expect(204, done);
      });
    });
  });
});
