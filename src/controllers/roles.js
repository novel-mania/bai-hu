const format = roles => ({
  id: roles.id,
  name: roles.name,
  users: roles.users.map(user => ({
    id: user.id,
    name: user.name,
  })),
});

class RolesController {
  constructor(Roles) {
    this.Roles = Roles;
  }

  get() {
    return this.Roles.find({})
      .populate('users')
      .then(roles => ({
          data: roles.map(format),
        }));
  }

  getById(id) {
    return this.Roles.findOne({ _id: id })
      .populate('users')
      .then(roles => ({
          data: format(roles),
        }));
  }

  create(data) {
    const roles = new this.Roles(data);

    return roles.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Roles.findOneAndUpdate({ _id: id }, data)
      .then(roles => ({
        data: format(roles),
      }));
  }

  remove(id) {
    return this.Roles.remove({ _id: id });
  }
}

export default RolesController;
