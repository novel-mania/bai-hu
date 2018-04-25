const format = post => ({
  id: post.id,
  title: post.title,
  content: post.content,
  author: post.author,
  book: post.book,
  tags: post.tags,
});

class PostsController {
  constructor(Posts) {
    this.Posts = Posts;
  }

  get() {
    return this.Posts.find({})
      .then(posts => ({
        data: posts.map(format),
      }));
  }

  getById(id) {
    return this.Posts.findOne({ _id: id })
      .then(post => ({
        data: format(post),
      }));
  }

  create(data) {
    const post = new this.Posts(data);

    return post.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Posts.findOneAndUpdate({ _id: id }, data)
      .then(post => ({
        data: format(post),
      }));
  }

  remove(id) {
    return this.Posts.remove({ _id: id });
  }
}

export default PostsController;
