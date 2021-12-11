import { Entity } from './Entity';

type BoardType = {
  id: string;
  title: string;
  columns: Record<string, unknown>[];
};

export class Board extends Entity {
  public title: string;

  public columns: Record<string, unknown>[];

  constructor({ title, columns }: Omit<BoardType, 'id'>) {
    super();

    this.title = title;
    this.columns = columns;
  }

  static isValidArgs({ title, columns }: Omit<BoardType, 'id'>) {
    return typeof title === 'string' && Array.isArray(columns);
  }

  static toResponse({ id, title, columns }: BoardType) {
    return { id, title, columns };
  }
}
