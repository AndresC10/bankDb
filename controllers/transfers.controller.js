const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.createTransfer = catchAsync(async (req, res) => {
  const { amount, senderAccountNumber, receiverAccountNumber } = req.body;

  const senderUser = await User.findOne({
    where: {
      status: true,
      accountNumber: senderAccountNumber,
    },
  });

  const receiverUser = await User.findOne({
    where: {
      status: true,
      accountNumber: receiverAccountNumber,
    },
  });

  if (!senderUser || !receiverUser || !amount) {
    throw new Error('You must provide all the fields');
  }

  if (senderUser.amount < +amount) {
    throw new Error('your balance is not enough');
  }

  await senderUser.update({ amount: senderUser.amount - +amount });
  await receiverUser.update({ amount: receiverUser.amount + +amount });

  const transfer = await Transfer.create({
    amount,
    senderAccountNumber,
    receiverAccountNumber,
  });

  res.json({
    status: 'success',
    message: 'The transfer was successfully completed ',
    transfer,
  });
});
