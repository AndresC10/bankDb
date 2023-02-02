const { Router } = require('express');
const {
  getUserHistory,
  createUser,
  loginUser,
} = require('../controllers/users.controller');

const router = Router();

router.get('/:id/history', getUserHistory);

router.post('/signup', createUser);

router.post('/login', loginUser);

module.exports = {
  usersRouter: router,
};
