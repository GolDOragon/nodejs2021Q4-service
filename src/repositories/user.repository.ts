import { User } from '../models/User.model';
import { Repository } from './Repository';

export const userRepository = new Repository(
  User,
  User.toResponse.bind(User),
  User.isValidArgs.bind(User)
);
