import { validateUUID4 } from '../helpers/validateUUID4';
import { Entity } from './Entity';

export class Task extends Entity {
  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: Omit<Task, 'id'>) {
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
  }: Omit<Task, 'id'>): boolean {
    return (
      typeof title === 'string' &&
      typeof order === 'number' &&
      typeof description === 'string' &&
      (userId === null || validateUUID4(userId)) &&
      (boardId === null || validateUUID4(boardId))
    );
  }

  public static toResponse({
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: Task): Partial<Task> {
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
