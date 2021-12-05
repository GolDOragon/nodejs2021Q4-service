const { unknownRouter } = require('./unknownRouter');
const { userPattern, userRouter } = require('./userRouter');
const { boardPattern, boardRouter } = require('./boardRouter');

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
