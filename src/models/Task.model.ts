import { validateUUID4 } from '../helpers/validateUUID4';
import { Entity } from './Entity';

type TaskType = {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
};

export class Task extends Entity {
  public title: string;

  public order: number;

  public description: string;

  public userId: string;

  public boardId: string;

  public columnId: string;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: Omit<TaskType, 'id'>) {
    super();

    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  static isValidArgs({
    title,
    order,
    description,
    userId,
    boardId,
  }: Omit<TaskType, 'id'>) {
    return (
      typeof title === 'string' &&
      typeof order === 'number' &&
      typeof description === 'string' &&
      (validateUUID4(userId) || userId === null) &&
      validateUUID4(boardId)
    );
  }

  static toResponse({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: TaskType) {
    return {
      id,
      title,
      order,
      description,
      userId,
      boardId,
      columnId,
    };
  }
}
