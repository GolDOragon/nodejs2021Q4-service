const UrlPattern = require('url-pattern');
const { unknownRouter } = require('./unknownRouter');
const userController = require('../controllers/userController');

const userPattern = new UrlPattern('/users(/:userId)');

const userRouter = (request, response, ctx) => {
  const { userId } = userPattern.match(request.url);

  switch (request.method) {
    case 'GET':
      if (userId) {
        userController.getUserById(request, response, { id: userId });
      } else {
        userController.getAllUsers(request, response);
      }
      break;

    case 'POST':
      userController.createUser(request, response, { body: ctx.body });
      break;

    case 'PUT':
      userController.updateUserById(request, response, {
        id: userId,
        body: ctx.body,
      });
      break;

    case 'DELETE':
      userController.deleteUserById(request, response, {
        id: userId,
      });
      break;

    default:
      unknownRouter(request, response);
  }
};

module.exports = { userPattern, userRouter };
