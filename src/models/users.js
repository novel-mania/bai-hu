import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema({
  name: String,
  profile_photo: String,
  email: String,
  password: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Books' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Posts' }],
  marks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Marks' }],
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Roles' },
});

class User {
  static isPassword(encodedPassword, password) {
    return bcrypt.compareSync(password, encodedPassword);
  }
}

schema.loadClass(User);
schema.pre('save', (next) => {
  const user = this;
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  next();
});

const Users = mongoose.model('Users', schema);

export default Users;
