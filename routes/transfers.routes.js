const { Router } = require('express');
const { createTransfer } = require('../controllers/transfers.controller');

const router = Router();

router.post('/', createTransfer);

module.exports = {
  transfersRouter: router,
};
