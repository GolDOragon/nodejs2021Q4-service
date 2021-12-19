import { RepositoryError, REPOSITORY_CODES } from '../errors/RepositoryError';
import { Entity, Newable } from '../models/Entity';

export class Repository<
  TEntity extends Entity,
  TClass extends Newable<TEntity>
> {
  private Entity: TClass;

  private name: string;

  private toResponse: (instance: TEntity) => Partial<TEntity>;

  private isValidArgs: (instance: TEntity) => boolean;

  private items: TEntity[] = [];

  constructor(
    entityClass: TClass,
    toResponse: (instance: TEntity) => Partial<TEntity>,
    isValidArgs: (instance: TEntity) => boolean
  ) {
    this.Entity = entityClass;
    this.name = entityClass.constructor.name;
    this.toResponse = toResponse;
    this.isValidArgs = isValidArgs;
  }

  async getAll(filterBy?: (item: TEntity) => boolean) {
    return Promise.resolve(
      this.items
        .filter(filterBy ?? (() => true))
        .map((item) => this.toResponse(item))
    );
  }

  async getOne(id: string) {
    const item = this.items.find((entity) => entity.id === id);

    if (!item) {
      throw new RepositoryError(
        `${this.name} doesn't exist`,
        REPOSITORY_CODES.NON_EXIST_ENTITY
      );
    }

    return Promise.resolve(this.toResponse(item));
  }

  async create(item: TEntity) {
    if (!this.isValidArgs(item)) {
      throw new RepositoryError(
        'Unknown Entity',
        REPOSITORY_CODES.INVALID_ENTITY
      );
    }

    const newItem = new this.Entity(item);

    this.items.push(newItem);

    return Promise.resolve(this.toResponse(newItem));
  }

  async deleteBy(condition: (item: TEntity) => boolean) {
    const deletedItems = this.items
      .filter((item) => !condition(item))
      .map(this.toResponse);

    this.items = this.items.filter(condition);

    return Promise.resolve(deletedItems);
  }

  async deleteOne(id: string) {
    const index = this.items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(
        `${this.name} doesn't exist`,
        REPOSITORY_CODES.NON_EXIST_ENTITY
      );
    }

    const deletedItem = this.items.splice(index, 1)[0];

    return Promise.resolve(this.toResponse(deletedItem as TEntity));
  }

  async updateOne(id: string, newFields: Partial<TEntity>) {
    const index = this.items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(
        `${this.name} doesn't exist`,
        REPOSITORY_CODES.NON_EXIST_ENTITY
      );
    }

    this.items[index] = {
      ...this.items[index],
      ...newFields,
    } as TEntity;

    return Promise.resolve(this.toResponse(this.items[index] as TEntity));
  }
}
