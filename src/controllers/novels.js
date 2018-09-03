const format = novel => ({
  id: novel.id,
  name: novel.name,
  alternatives_titles: novel.alternatives_titles,
  authors: novel.authors,
  slug: novel.slug,
  type: novel.type,
  cover: novel.cover,
  sinopse: novel.sinopse,
  rating: novel.rating,
  categories: novel.categories,
  advisory_rating: novel.advisory_rating,
  sponsorship: novel.sponsorship,
  recommendations: novel.recommendations,
  chapters: novel.chapters,
  comments: novel.comments,
});

const formatChapter = chapter => ({
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


class NovelsController {
  constructor(Novels) {
    this.Novels = Novels;
  }

  get() {
    return this.Novels.find({})
      .then(novels => ({
        data: novels.map(format),
      }));
  }

  getById(id) {
    return this.Novels.findOne({ _id: id })
      .then(novel => ({
        data: format(novel),
      }));
  }

  getChapters(id) {
    return this.Novels.findOne({ _id: id })
      .populate('chapters')
      .then(novel => ({
        data: novel.chapters.map(formatChapter),
      }));
  }

  create(data) {
    const novel = new this.Novels(data);

    return novel.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Novels.findOneAndUpdate({ _id: id }, data)
      .then(novel => ({
        data: format(novel),
      }));
  }

  remove(id) {
    return this.Novels.remove({ _id: id });
  }
}

export default NovelsController;

