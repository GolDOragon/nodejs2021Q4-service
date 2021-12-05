const { unknownRouter } = require('./unknown.router');
const { userPattern, userRouter } = require('./user.router');

const getRouter = (url) => {
  if (userPattern.match(url)) {
    return userRouter;
  }


  return unknownRouter;
};

module.exports = { getRouter };
