import { validateUUID4 } from '../helpers/validateUUID4';
import { Entity } from './Entity';

export type TaskFields = {
  /** Task title */
  title: string;
  /** Task order in column */
  order: number;
  /** Task description */
  description: string;
  /** Assigned User {@link User} */
  userId: string | null;
  /** A board id to which the task belongs */
  boardId: string | null;
  /** A column id to which the task belongs */
  columnId: string | null;
};

/** Represent task in database */
export class Task extends Entity {
  public title: string;

  public order: number;

  public description: string;

  public userId: string | null;

  public boardId: string | null;

  public columnId: string | null;

  /**
   * Create Task
   * @param object base fields {@link TaskFields}
   * @returns Task instance
   */
  constructor({
    title,
    order,
    description,
    userId,
    boardId,
    columnId,
  }: TaskFields) {
    super();

    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }

  /**
   * Check if the object can be used in task creation
   * @param object see {@link TaskFields}
   * @returns true if we can create a task from object, otherwise false
   */
  static isValidArgs({
    title,
    order,
    description,
    userId,
    boardId,
  }: TaskFields): boolean {
    return (
      typeof title === 'string' &&
      typeof order === 'number' &&
      typeof description === 'string' &&
      (userId === null || validateUUID4(userId)) &&
      (boardId === null || validateUUID4(boardId))
    );
  }

  /**
   * Can remove secret field from task
   * @param task {@link Task}
   * @returns now, full Task instance
   */
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
