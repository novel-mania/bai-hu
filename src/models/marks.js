import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' }],
});

const Marks = mongoose.model('Marks', schema);

export default Marks;

