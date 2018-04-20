import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routes from './routes';
import database from '../config/database';

const app = express();

const configureExpress = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());

  app.use('/', routes);
  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  // Error handler
  app.use((err, req, res) => {
    // Set locals, only providing error in development
    res.locals.message = err.message;

    // Render the error page
    res.status(err.status || 500);
  });
  return app;
};

export default () => database.connect().then(configureExpress);
