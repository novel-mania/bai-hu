import sinon from 'sinon';
import ChaptersController from '../../../src/controllers/chapters';
import Chapters from '../../../src/models/chapters';

describe('Controllers: Chapters', () => {
  const defaultChapter = {
    id: '56cb91bdc3464f14678934ca',
    name: 'ATG - Teste',
    chapter_num: 200,
    content: 'Teste conteúdo do capítulo',
    translators: ['1', '2'],
    reviewers: ['3'],
    volume: { name: 'volume 1', volume_num: 1 },
    comments: ['100', '104', '105'],
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Chapters, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should return a list with all chapters', () => {
      Chapters.find.withArgs({}).resolves([defaultChapter]);

      const chaptersController = new ChaptersController(Chapters);
      return chaptersController.get()
        .then(chapters => expect(chapters.data).to.be.eql([defaultChapter]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Chapters.find.withArgs({}).rejects({ message: 'Error' });

        const chaptersController = new ChaptersController(Chapters);
        return chaptersController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Chapters, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should return a chapter by id', () => {
      const id = '1';
      Chapters.findOne.withArgs({ _id: id }).resolves(defaultChapter);

      const chaptersController = new ChaptersController(Chapters);
      return chaptersController.getById(id)
        .then(chapter => expect(chapter.data).to.be.eql(defaultChapter));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        Chapters.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const chaptersController = new ChaptersController(Chapters);
        return chaptersController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Chapters.prototype, 'save');
    });

    after(() => {
      stub.restore();
    });

    it('should create a new chapter', () => {
      stub.withArgs().resolves(defaultChapter);

      const chaptersController = new ChaptersController(Chapters);
      return chaptersController.create(defaultChapter)
        .then(chapter => expect(chapter.data).to.be.eql(defaultChapter));
    });
    context('when an error ocurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const chaptersController = new ChaptersController(Chapters);
        return chaptersController.create(defaultChapter)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('put()', () => {
    before(() => {
      stub = sinon.stub(Chapters, 'findOneAndUpdate');
    });
    after(() => {
      stub.restore();
    });

    it('should update an existent chapter', () => {
      const id = '1';
      const updatedChapter = {
        id,
        name: 'ATG - Título Atualizado',
        chapter_num: 200,
        content: 'Conteudo atualizado.',
        translators: ['1', '2'],
        reviewers: ['3'],
        volume: { name: 'volume 1', volume_num: 1 },
        comments: ['100', '104', '105'],
      };

      stub.withArgs({ _id: id }, updatedChapter).resolves(updatedChapter);

      const chaptersController = new ChaptersController(Chapters);
      return chaptersController.update(id, updatedChapter)
        .then(chapter => expect(chapter.data).to.be.eql(updatedChapter));
    });

    context('when an error ocurs', () => {
      it('should return 422', () => {
        const id = '1';
        const updatedChapter = {
          id,
          users: ['1'],
          chapters: ['1', '2'],
        };

        stub.withArgs({ _id: id }, updatedChapter).rejects({ message: 'Error' });

        const chaptersController = new ChaptersController(Chapters);
        return chaptersController.update(id, updatedChapter)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Chapters, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should delete a existent chapter', () => {
      const id = '1';
      stub.withArgs({ _id: id }).resolves([1]);

      const chaptersController = new ChaptersController(Chapters);
      return chaptersController.remove(id)
        .then(chapter => expect(chapter).to.be.eql([1]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const chaptersController = new ChaptersController(Chapters);
        return chaptersController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
