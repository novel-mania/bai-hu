import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  name: String,
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Users' }],
});
const Roles = mongoose.model('Roles', schema);

export default Roles;
