import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
});
const Categories = mongoose.model('Categories', schema);

export default Categories;
