const { Board } = require('../models/Board.model');
const { Repository } = require('./Repository');

const boardRepository = new Repository(Board);

module.exports = { boardRepository };
