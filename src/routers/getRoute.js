const { unknownRouter } = require('./unknown.router');
const { userPattern, userRouter } = require('./user.router');
const { boardPattern, boardRouter } = require('./board.router');

const getRouter = (url) => {
  if (userPattern.match(url)) {
    return userRouter;
  }

  if (boardPattern.match(url)) {
    return boardRouter;
  }


  return unknownRouter;
};

module.exports = { getRouter };
