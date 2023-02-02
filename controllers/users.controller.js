const Transfer = require('../models/transfers.model');
const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

const createUser = catchAsync(async (req, res) => {
  const { name, password, amount = 1000 } = req.body;

  const accountNumber = Math.floor(
    Math.random() * (100000000 - 100000) + 1000000
  );

  const user = await User.create({
    name: name.toLowerCase(),
    accountNumber,
    password,
    amount,
  });

  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      status: true,
      accountNumber,
      password,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'The user successfully logged in',
    user,
  });
});

const getUserHistory = catchAsync(async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({
    where: {
      status: true,
      id,
    },
  });

  const transfers = await Transfer.findAll({
    where: {
      senderAccountNumber: user.accountNumber,
    },
  });

  res.status(200).json({
    status: 'success',
    transfers,
  });
});

module.exports = {
  createUser,
  loginUser,
  getUserHistory,
};
