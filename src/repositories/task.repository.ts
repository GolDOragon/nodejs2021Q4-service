import { Task } from '../models/Task.model';
import { Repository } from './Repository';

export const taskRepository = new Repository(
  Task,
  Task.toResponse.bind(Task),
  Task.isValidArgs.bind(Task)
);
