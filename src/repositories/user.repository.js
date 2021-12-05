const { User } = require('../models/User.model');
const { Repository } = require('./Repository');

const userRepository = new Repository(User);

module.exports = { userRepository };
