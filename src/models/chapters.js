import mongoose, { mongo } from 'mongoose';

const volume_schema = new mongoose.Schema({
  name: String,
  volume_num: Number,
});

const schema = new mongoose.Schema({
  name: String,
  chapter_num: Number,
  content: String,
  likes: Number,
  translators: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  reviewers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  volume: volume_schema,
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
});

const Chapters = mongoose.model('Chapters', schema);

export default Chapters;
