const { Task } = require('../models/Task.model');
const { Repository } = require('./Repository');

const taskRepository = new Repository(Task);

module.exports = { taskRepository };
