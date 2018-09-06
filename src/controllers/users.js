const format = user => ({
  id: user.id,
  name: user.name,
  username: user.username,
  profile_photo: user.profile_photo,
  email: user.email,
  books: user.books,
  posts: user.posts,
  marks: user.marks,
  role: user.role,
});

class UsersController {
  constructor(Users, Roles) {
    this.Users = Users;
    this.Roles = Roles;
  }

  get() {
    return this.Users.find({})
      .then(users => ({
        data: users.map(format),
      }));
  }

  getById(id) {
    return this.Users.findOne({ _id: id })
      .then(user => ({
        data: format(user),
      }));
  }

  async create(data) {
    const user = new this.Users(data);

    try {
      const newUser = await user.save();

      const role = await this.Roles.findOne({ _id: user.role });
      role.users.push(newUser);
      await role.save();

      return {
        data: format(newUser),
      };
    } catch(error) {
      throw error;
    }
  }

  async update(id, data) {
    const user = await this.Users.findOne({ _id: id });

    try {
      if (data.name) user.name = data.name;
      if (data.username) user.username = data.username;
      if (data.email) user.email = data.email;
      if (data.password) user.password = data.password;
      if (data.role && data.role !== user.role) {
        if (user.role) {
          const oldRole = await this.Roles.findOne({ _id: user.role });
          const exist = oldRole.users.findIndex(item => item.toString() === id);
          if (exist > -1) oldRole.users.splice(exist, 1);
          await oldRole.save();
        }

        const newRole = await this.Roles.findOne({ _id: data.role });
        newRole.users.push(user);
        await newRole.save();

        user.role = data.role;
      }

      const newUser = await user.save();
      return {
        data: format(newUser),
      };
    } catch (error) {

    }
  }

  remove(id) {
    return this.Users.remove({ _id: id });
  }
}

export default UsersController;

