import mongoose from 'mongoose';

const shema = new mongoose.Schema({
  name: String,
  alternatives_titles: [String],
  authors: [String],
  slug: String,
  type: String,
  cover: String,
  sinopse: String,
  rating: Number,
  categories: [String],
  advisory_rating: String,
  sponsorship: {
    name: String,
    url: String,
  },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
  recommendations: [{
    name: String,
    url: String,
    image: String,
  }],
  chapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapters' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comments' }],
});

const Books = mongoose.model('Books', shema);

export default Books;
