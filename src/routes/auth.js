import express from 'express';
import config from 'config';
import jwt from 'jwt-simple';
import Users from '../models/users';

const router = express.Router();

router.post('/token', (req, res) => {
  if (req.body.email && req.body.password) {
    const email = req.body.email;
    const password = req.body.password;

    Users.findOne({ where: { email } })
      .then((user) => {
        if (Users.isPassword(user.password, password)) {
          const payload = { id: user.id };
          res.json({
            token: jwt.encode(payload, config.get('authentication.jwtSecret')),
          });
        } else {
          res.sendStatus(401);
        }
      })
      .catch(() => res.sendStatus(401));
  } else {
    res.sendStatus(401);
  }
});

export default router;
