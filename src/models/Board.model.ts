import { Entity } from './Entity';

export class Board extends Entity {
  public title: string;

  public columns: Record<string, unknown>[];

  constructor({ title, columns }: Omit<Board, 'id'>) {
    super();

    this.title = title;
    this.columns = columns;
  }

  static isValidArgs({ title, columns }: Omit<Board, 'id'>) {
    return typeof title === 'string' && Array.isArray(columns);
  }

  static toResponse({ id, title, columns }: Board) {
    return { id, title, columns };
  }
}
