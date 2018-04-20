/* eslint-disable class-methods-use-this */
import sinon from 'sinon';
import CategoriesController from '../../../src/controllers/categories';
import Categories from '../../../src/models/categories';

describe('Controller: Categories', () => {
  const defaultCategory = {
    id: '56cb91bdc3464f14678934ca',
    name: 'Xianxia',
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Categories, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should call send with a list of categories', () => {
      Categories.find.withArgs({}).resolves([defaultCategory]);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.get()
        .then(categories => expect(categories.data).to.be.eql([defaultCategory]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Categories.find.withArgs({}).rejects({ message: 'Error' });

        const categoriesController = new CategoriesController(Categories);
        return categoriesController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Categories, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should call send with one category', () => {
      const id = '56cb91bdc3464f14678934ca';
      Categories.findOne.withArgs({ _id: id }).resolves(defaultCategory);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.getById(id)
        .then(category => expect(category.data).to.be.eql(defaultCategory));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '56cb91bdc3464f14678934ca';
        Categories.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const categoriesController = new CategoriesController(Categories);
        return categoriesController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Categories.prototype, 'save');
    });

    after(() => {
      stub.restore();
    });

    it('should call send with a new category', () => {
      stub.withArgs().resolves(defaultCategory);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.create(defaultCategory)
        .then(category => expect(category.data).to.be.eql(defaultCategory));
    });

    context('when an error occurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const categoriesController = new CategoriesController(Categories);
        return categoriesController.create(defaultCategory)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('update()', () => {
    before(() => {
      stub = sinon.stub(Categories, 'findOneAndUpdate');
    });

    after(() => {
      stub.restore();
    });

    it('should response with 200 when the product has been updated', () => {
      const id = '56cb91bdc3464f14678934ca';
      const updatedCategory = {
        id,
        name: 'Updated Category',
      };
      stub.withArgs({ _id: id }, updatedCategory).resolves(updatedCategory);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.update(id, updatedCategory)
        .then(category => expect(category.data).to.be.eql(updatedCategory));
    });

    context('when an error occurs', () => {
      it('should return 422', () => {
        const id = '56cb91bdc3464f14678934ca';
        const updatedCategory = {
          _id: id,
          name: 'Updated Category',
        };
        stub
          .withArgs({ _id: id }, updatedCategory)
          .rejects({ message: 'Error' });

        const categoriesController = new CategoriesController(Categories);
        return categoriesController.update(id, updatedCategory)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Categories, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should response with 204 when then category has been deleted', () => {
      const id = '56cb91bdc3464f14678934ca';
      stub.withArgs({ _id: id }).resolves([1]);

      const categoriesController = new CategoriesController(Categories);
      return categoriesController.remove(id)
        .then(result => expect(result).to.be.eql([1]));
    });

    context('when an error occours', () => {
      it('should return 400', () => {
        const id = '56cb91bdc3464f14678934ca';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const categoriesController = new CategoriesController(Categories);
        return categoriesController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
