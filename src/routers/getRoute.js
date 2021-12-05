const { unknownRouter } = require('./unknownRouter');
const { userPattern, userRouter } = require('./userRouter');

const getRouter = (url) => {
  if (userPattern.match(url)) {
    return userRouter;
  }


  return unknownRouter;
};

module.exports = { getRouter };
