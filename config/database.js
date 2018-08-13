import mongoose from 'mongoose';
import config from 'config';

mongoose.Promise = Promise;
// mongoose.set('debug', true);

const mongodbUrl = config.get('database.mongoUrl');

const connect = () => mongoose.connect(mongodbUrl);

export default {
  connect,
};
