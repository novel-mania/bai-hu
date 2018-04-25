import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Books' },
  tags: [String],
});

const Posts = mongoose.model('Posts', schema);

export default Posts;
