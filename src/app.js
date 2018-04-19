import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import database from '../config/database';

const app = express();

const configureExpress = () => {
  app.use(bodyParser.json());
  app.use(cors());
  app.use('/', routes);

  return app;
};

export default () => database.connect().then(configureExpress);
