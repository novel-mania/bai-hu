import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import config from 'config';
import Users from '../models/users';

export default () => {
  const opts = {};
  opts.secretOrKey = config.get('authentication.jwtSecret');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const strategy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then(user => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          });
        }
        return done(null, false);
      })
      .catch(error => done(error, null));
  });

  passport.use(strategy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.get('authentication.jwtSession')),
  };
}
