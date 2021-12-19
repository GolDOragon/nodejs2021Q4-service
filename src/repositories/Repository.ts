import { RepositoryError, REPOSITORY_CODES } from '../errors/RepositoryError';
import { Entity, Newable } from '../models/Entity';

/**
 * Represent work with database (current uses data-in-memory database)
 */
export class Repository<
  TEntity extends Entity,
  TClass extends Newable<TEntity>
> {
  private Entity: TClass;

  private name: string;

  private toResponse: (instance: TEntity) => Partial<TEntity>;

  private isValidArgs: (instance: Omit<TEntity, 'id'>) => boolean;

  private items: TEntity[] = [];

  /**
   * Create repository, that stores model instance
   * @param entityClass entity model
   * @param toResponse prepare instance to return
   * @param isValidArgs check if args can be used in creation model instance
   * @returns Model Repository
   */
  constructor(
    entityClass: TClass,
    toResponse: (instance: TEntity) => Partial<TEntity>,
    isValidArgs: (instance: Omit<TEntity, 'id'>) => boolean
  ) {
    this.Entity = entityClass;
    this.name = entityClass.constructor.name;
    this.toResponse = toResponse;
    this.isValidArgs = isValidArgs;
  }

  /**
   * Get all stored instance, also can filter them before returning
   * @param filterBy model filter
   * @returns Array of instance
   */
  async getAll(filterBy?: (item: TEntity) => boolean) {
    return Promise.resolve(
      this.items
        .filter(filterBy ?? (() => true))
        .map((item) => this.toResponse(item))
    );
  }

  /**
   * Find instance by Id and return it
   * @param id instance id
   * @returns Instance
   */
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

  /**
   * Write new instance in database, before writing checks object fields
   * @param item base fields
   * @returns Instance
   */
  async create(item: Omit<TEntity, 'id'>) {
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

  /**
   * Delete instance by condition
   * @param condition model filter
   * @returns Array of deleted instance
   */
  async deleteBy(condition: (item: TEntity) => boolean) {
    const deletedItems = this.items
      .filter((item) => !condition(item))
      .map(this.toResponse);

    this.items = this.items.filter(condition);

    return Promise.resolve(deletedItems);
  }

  /**
   * Delete instance by id
   * @param id instance id
   * @returns deleted instance
   */
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

  /**
   * Find instance by id and update it
   * @param id instance id
   * @param newFields updated fields
   * @returns updated instance
   */
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
