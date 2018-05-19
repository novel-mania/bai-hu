import sinon from 'sinon';
import MarksController from '../../../src/controllers/marks';
import Marks from '../../../src/models/marks';

describe('Controllers: Marks', () => {
  const defaultMark = {
    id: '56cb91bdc3464f14678934ca',
    users: ['1'],
    chapters: ['1'],
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Marks, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should return a list with all marks', () => {
      Marks.find.withArgs({}).resolves([defaultMark]);

      const marksController = new MarksController(Marks);
      return marksController.get()
        .then(marks => expect(marks.data).to.be.eql([defaultMark]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Marks.find.withArgs({}).rejects({ message: 'Error' });

        const marksController = new MarksController(Marks);
        return marksController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Marks, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should return a mark by id', () => {
      const id = '1';
      Marks.findOne.withArgs({ _id: id }).resolves(defaultMark);

      const marksController = new MarksController(Marks);
      return marksController.getById(id)
        .then(mark => expect(mark.data).to.be.eql(defaultMark));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        Marks.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const marksController = new MarksController(Marks);
        return marksController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Marks.prototype, 'save');
    });

    after(() => {
      stub.restore();
    });

    it('should create a new mark', () => {
      stub.withArgs().resolves(defaultMark);

      const marksController = new MarksController(Marks);
      return marksController.create(defaultMark)
        .then(mark => expect(mark.data).to.be.eql(defaultMark));
    });
    context('when an error ocurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const marksController = new MarksController(Marks);
        return marksController.create(defaultMark)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('put()', () => {
    before(() => {
      stub = sinon.stub(Marks, 'findOneAndUpdate');
    });
    after(() => {
      stub.restore();
    });

    it('should update an existent mark', () => {
      const id = '1';
      const updatedMark = {
        id,
        users: ['1'],
        chapters: ['1', '2'],
      };

      stub.withArgs({ _id: id }, updatedMark).resolves(updatedMark);

      const marksController = new MarksController(Marks);
      return marksController.update(id, updatedMark)
        .then(mark => expect(mark.data).to.be.eql(updatedMark));
    });

    context('when an error ocurs', () => {
      it('should return 422', () => {
        const id = '1';
        const updatedMark = {
          id,
          users: ['1'],
          chapters: ['1', '2'],
        };

        stub.withArgs({ _id: id }, updatedMark).rejects({ message: 'Error' });

        const marksController = new MarksController(Marks);
        return marksController.update(id, updatedMark)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Marks, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should delete a existent mark', () => {
      const id = '1';
      stub.withArgs({ _id: id }).resolves([1]);

      const marksController = new MarksController(Marks);
      return marksController.remove(id)
        .then(mark => expect(mark).to.be.eql([1]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const marksController = new MarksController(Marks);
        return marksController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
