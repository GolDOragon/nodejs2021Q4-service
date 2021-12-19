import { Entity } from './Entity';

export type BoardFields = {
  /** board title */
  title: string;
  /** board columns */
  columns: Record<string, unknown>[];
};

/** Represent board in database */
export class Board extends Entity {
  public title: string;

  public columns: Record<string, unknown>[];

  /**
   * Create Board with base fields
   * @param object base fields {@link BoardFields}
   *
   * @returns Board instance
   */
  constructor({ title, columns }: BoardFields) {
    super();

    this.title = title;
    this.columns = columns;
  }

  /**
   * Check if the object can be used in board creation
   * @param object see {@link BoardFields}
   * @returns true if we can create a board from object, otherwise false
   */
  static isValidArgs({ title, columns }: BoardFields) {
    return typeof title === 'string' && Array.isArray(columns);
  }

  /**
   * Can remove secret field from task
   * @param task {@link Task}
   * @returns now, full Task instance
   */
  static toResponse({ id, title, columns }: Board): Partial<Board> {
    return { id, title, columns };
  }
}
