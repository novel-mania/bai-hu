const format = user => ({
  id: user.id,
  name: user.name,
  profile_photo: user.profile_photo,
  email: user.email,
  books: user.books,
  posts: user.posts,
  marks: user.marks,
  role: user.role,
});

class UsersController {
  constructor(Users, Auth) {
    this.Users = Users;
    this.Auth = Auth;
  }

  get() {
    return this.Users.find({})
      .then(users => ({
        data: users.map(format)
      }));
  }

  getById(id) {
    return this.Users.findOne({ _id: id })
      .then(user => ({
        data: format(user),
      }));
  }

  create(data) {
    const user = new this.Users(data);

    return user.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Users.findOneAndUpdate({ _id: id }, data, { new: true })
      .then(user => ({
        data: format(user),
      }));
  }

  remove(id) {
    return this.Users.remove({ _id: id });
  }
}

export default UsersController;

