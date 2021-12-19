import { Board } from '../models/Board.model';
import { Repository } from './Repository';

export const boardRepository = new Repository(
  Board,
  Board.toResponse.bind(Board),
  Board.isValidArgs.bind(Board)
);
