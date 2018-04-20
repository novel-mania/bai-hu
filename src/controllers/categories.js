const format = category => ({
  id: category.id,
  name: category.name,
});

class CategoriesController {
  constructor(Categories) {
    this.Categories = Categories;
  }

  get() {
    return this.Categories.find({})
      .then(categories => ({
        data: categories.map(format),
      }));
  }

  getById(id) {
    return this.Categories.findOne({ _id: id })
      .then(category => ({
        data: format(category),
      }));
  }

  create(data) {
    const category = new this.Categories(data);

    return category.save()
      .then(result => ({
        data: format(result),
      }));
  }

  update(id, data) {
    return this.Categories.findOneAndUpdate({ _id: id }, data)
      .then(category => ({
        data: format(category),
      }));
  }

  remove(id) {
    return this.Categories.remove({ _id: id });
  }
}

export default CategoriesController;
