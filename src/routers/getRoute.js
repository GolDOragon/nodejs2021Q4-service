const { unknownRouter } = require('./unknownRouter');
const { userPattern, userRouter } = require('./userRouter');
const { boardPattern, boardRouter } = require('./boardRouter');
const { taskPattern, taskRouter } = require('./taskRouter');

const getRouter = (url) => {
  if (userPattern.match(url)) {
    return userRouter;
  }

  if (boardPattern.match(url)) {
    return boardRouter;
  }

  if (taskPattern.match(url)) {
    return taskRouter;
  }

  return unknownRouter;
};

module.exports = { getRouter };
