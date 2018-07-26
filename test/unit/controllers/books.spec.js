import sinon from 'sinon';
import BooksController from '../../../src/controllers/books';
import Books from '../../../src/models/books';

describe('Controllers: Books', () => {
  const defaultBook = {
    id: '56cb91bdc3464f14678934ca',
    name: 'Book name',
    alternatives_titles: 'Alternative book name',
    authors: ['Author name'],
    slug: 'Book slug',
    type: 'Book type',
    cover: 'http://novelmania.com.br/pic.png',
    sinopse: 'Book sinopse',
    rating: 5,
    categories: ['categorie name'],
    advisory_rating: 'rating',
    sponsorship: { name: 'padrim', url: 'http://padrim.com.br/novel' },
    recommendations: { name: 'recommendation', url: 'rec.com.br', image: 'http://novelmania.com.br/rec.png' },
    chapters: ['1', '2', '3', '4', '5'],
    comments: ['100', '101'],
  };
  let stub;

  describe('get()', () => {
    before(() => {
      stub = sinon.stub(Books, 'find');
    });

    after(() => {
      stub.restore();
    });

    it('should return a list with all books', () => {
      Books.find.withArgs({}).resolves([defaultBook]);

      const booksController = new BooksController(Books);
      return booksController.get()
        .then(books => expect(books.data).to.be.eql([defaultBook]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        Books.find.withArgs({}).rejects({ message: 'Error' });

        const booksController = new BooksController(Books);
        return booksController.get()
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('getById()', () => {
    before(() => {
      stub = sinon.stub(Books, 'findOne');
    });

    after(() => {
      stub.restore();
    });

    it('should return a book by id', () => {
      const id = '1';
      Books.findOne.withArgs({ _id: id }).resolves(defaultBook);

      const booksController = new BooksController(Books);
      return booksController.getById(id)
        .then(book => expect(book.data).to.be.eql(defaultBook));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        Books.findOne.withArgs({ _id: id }).rejects({ message: 'Error' });

        const booksController = new BooksController(Books);
        return booksController.getById(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });

  describe('create()', () => {
    before(() => {
      stub = sinon.stub(Books.prototype, 'save');
    });

    after(() => {
      stub.restore();
    });

    it('should create a new book', () => {
      stub.withArgs().resolves(defaultBook);

      const booksController = new BooksController(Books);
      return booksController.create(defaultBook)
        .then(book => expect(book.data).to.be.eql(defaultBook));
    });
    context('when an error ocurs', () => {
      it('should return 422', () => {
        stub.withArgs().rejects({ message: 'Error' });

        const booksController = new BooksController(Books);
        return booksController.create(defaultBook)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('put()', () => {
    before(() => {
      stub = sinon.stub(Books, 'findOneAndUpdate');
    });
    after(() => {
      stub.restore();
    });

    it('should update an existent book', () => {
      const id = '1';
      const updatedBook = {
        id,
        name: 'edit book name',
        alternatives_titles: 'Alternative book name',
        authors: ['Author name'],
        slug: 'Book slug',
        type: 'Book type',
        cover: 'http://novelmania.com.br/pic.png',
        sinopse: 'Book sinopse',
        rating: 5,
        categories: ['categorie name'],
        advisory_rating: 'rating',
        sponsorship: { name: 'padrim', url: 'http://padrim.com.br/novel' },
        recommendations: { name: 'recommendation', url: 'rec.com.br', image: 'http://novelmania.com.br/rec.png' },
        chapters: ['1', '2', '3', '4', '5'],
        comments: ['100', '101'],
      };

      stub.withArgs({ _id: id }, updatedBook).resolves(updatedBook);

      const booksController = new BooksController(Books);
      return booksController.update(id, updatedBook)
        .then(book => expect(book.data).to.be.eql(updatedBook));
    });

    context('when an error ocurs', () => {
      it('should return 422', () => {
        const id = '1';
        const updatedBook = {
          id,
          name: 'edit book name',
          alternatives_titles: 'Alternative book name',
          authors: ['Author name'],
          slug: 'Book slug',
          type: 'Book type',
          cover: 'http://novelmania.com.br/pic.png',
          sinopse: 'Book sinopse',
          rating: 5,
          categories: ['categorie name'],
          advisory_rating: 'rating',
          sponsorship: { name: 'padrim', url: 'http://padrim.com.br/novel' },
          recommendations: { name: 'recommendation', url: 'rec.com.br', image: 'http://novelmania.com.br/rec.png' },
          chapter: ['1', '2', '3', '4', '5'],
          comment: ['100', '101'],
        };

        stub.withArgs({ _id: id }, updatedBook).rejects({ message: 'Error' });

        const booksController = new BooksController(Books);
        return booksController.update(id, updatedBook)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
  describe('delete()', () => {
    before(() => {
      stub = sinon.stub(Books, 'remove');
    });

    after(() => {
      stub.restore();
    });

    it('should delete a existent book', () => {
      const id = '1';
      stub.withArgs({ _id: id }).resolves([1]);

      const booksController = new BooksController(Books);
      return booksController.remove(id)
        .then(book => expect(book).to.be.eql([1]));
    });

    context('when an error ocurs', () => {
      it('should return 400', () => {
        const id = '1';
        stub.withArgs({ _id: id }).rejects({ message: 'Error' });

        const booksController = new BooksController(Books);
        return booksController.remove(id)
          .catch(err => expect(err).to.be.eql({ message: 'Error' }));
      });
    });
  });
});
