const format = chapter => ({
  id: chapter.id,
  name: chapter.name,
  novel: chapter.novel,
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
  constructor(Novels, Chapters) {
    this.Novels = Novels;
    this.Chapters = Chapters;
  }

  get(novel) {
    const where = {};
    if (novel) where.novel = novel;
    return this.Chapters.find(where)
      .populate('novel')
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

  async create(novelId, data) {
    const chapter = new this.Chapters(data);
    chapter.novel = novelId;

    try {
      const newChapter = await chapter.save();

      const novel = await this.Novels.findOne({ _id: novelId });
      novel.chapters.push(newChapter);
      await novel.save();

      return {
        data: format(newChapter),
      };
    } catch(error) {
      throw error;
    }
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
