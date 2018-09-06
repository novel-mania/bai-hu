import mongoose from 'mongoose';

const volumeSchema = new mongoose.Schema({
  name: String,
  volume_num: Number,
});

const schema = new mongoose.Schema({
  novel: { type: mongoose.Schema.Types.ObjectId, ref: 'Novels' },
  name: String,
  chapter_num: Number,
  content: String,
  likes: Number,
  translators: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  editors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  volume: volumeSchema,
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
});

const Chapters = mongoose.model('Chapters', schema);

export default Chapters;
