const format = book => ({
  id: book.id,
  name: book.name,
});

class BooksController {
  constructor(Books) {
    this.Books = Books;
  }

  get() {
    return this.Books.find({})
      .then(books => ({
        data: books.map(format),
      }));
  }

  getById(id) {
    return this.Books.findOne({ _id: id })
      .then(book => ({
        data: format(book),
      }));
  }

  create(data) {
    const book = new this.Books(data);

    return book.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Books.findoneAndUpdate({ _id: id }, data)
      .then(book => ({
        data: format(book),
      }));
  }

  remove(id) {
    return this.Books.remove({ _id: id });
  }
}

export default BooksController;

