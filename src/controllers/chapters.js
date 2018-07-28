const format = chapter => ({
  id: chapter.id,
  name: chapter.name,
  chapter_num: chapter.chapter_num,
  content: chapter.content,
  translators: chapter.translators,
  reviewers: chapter.reviewers,
  volume: {
    name: chapter.volume.name,
    volume_num: chapter.volume.volume_num,
  },
  comments: chapter.comments,
});

class ChaptersController {
  constructor(Chapters) {
    this.Chapters = Chapters;
  }

  get() {
    return this.Chapters.find({})
      .then(chapters => ({
        data: chapters.map(format),
      }));
  }

  getById(id) {
    return this.Chapters.findOne({ _id: id })
      .then(chapter => ({
        data: format(chapter),
      }));
  }

  create(data) {
    const chapter = new this.Chapters(data);

    return chapter.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Chapters.findOneAndUpdate({ _id: id }, data)
      .then(chapter => ({
        data: format(chapter),
      }));
  }

  remove(id) {
    return this.Chapters.remove({ _id: id });
  }
}

export default ChaptersController;
