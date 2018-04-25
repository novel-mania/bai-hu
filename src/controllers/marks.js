const format = mark => ({
  users: mark.users,
  chapters: mark.chapters,
});

class MarksController {
  constructor(Marks) {
    this.Marks = Marks;
  }

  get() {
    return this.Marks.find({})
      .then(marks => ({
        data: marks.map(format),
      }));
  }

  getById(id) {
    return this.Marks.findOne({ _id: id })
      .then(mark => ({
        data: format(mark),
      }));
  }

  create(data) {
    const mark = new this.Marks(data);

    return mark.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(data, id) {
    return this.Marks.findByIdAndUpdate({ _id: id }, data)
      .then(mark => ({
        data: format(mark),
      }));
  }

  remove(id) {
    return this.Marks.remove({ _id: id });
  }
}

export default MarksController;
