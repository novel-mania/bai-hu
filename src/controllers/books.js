const format = book => ({
  id: book.id,
  name: book.name,
  alternatives_titles: book.alternatives_titles,
  author: book.author,
  slug: book.slug,
  type: book.type,
  cover: book.cover,
  sinopse: book.sinopse,
  rating: book.rating,
  categories: book.categories,
  advisory_rating: book.advisory_rating,
  sponsorship: book.sponsorship,
  recommendations: book.recommendations,
  chapter: book.chapter,
  comment: book.comment,
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

