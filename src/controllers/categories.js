const format = category = ({
  id: category.id,
  name: category.name,
});

class CategoriesController {
  constructor(Categories) {
    this.Categories = Categories;
  }

  get(req, res) {
    return this.Categories.find({})
      .then(categories => ({
        data: categories.map(format)
      }))
      .then(categories => res.send(categories))
      .catch(err => res.status(400).send(err.message));
  }

  getById(req, res) {
    const { params: { id } } = req;

    return this.Categories.find({ _id: id })
      .then(format)
      .then(category => res.send(category))
      .catch(err => res.status(400).send(err.message));
  }

  create(req, res) {
    const category = new this.Categories(req.body);

    return category.save()
      .then(format)
      .then(category => res.status(201).send(category))
      .catch(err => res.status(400).send(err.message));
  }

  update(req, res) {
    const { params: { id } } = req;

    return this.Categories.findOneAtUpdate({ _id: id }, req.body)
      .then(() => res.sendStatus(200))
      .catch(err => res.status(400).send(err.message));
  }

  remove(req, res) {
    const { params: { id } } = req;

    return this.Categories.remove({ _id: id })
      .then(() => res.sendStatus(204))
      .catch(err => res.status(400).send(err.message));
  }
}

export default CategoriesController;
