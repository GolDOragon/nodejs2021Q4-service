const {
  RepositoryError,
  REPOSITORY_CODES,
} = require('../errors/RepositoryError');

class Repository {
  constructor(entityClass) {
    this.items = [];

    this.Entity = entityClass;
    this.name = entityClass.name;
    this.toResponse = entityClass.toResponse;
  }

  async getAll(filterBy = () => true) {
    return this.items.filter(filterBy).map((item) => this.toResponse(item));
  }

  async getOne(id) {
    const item = this.items.find((entity) => entity.id === id);

    if (!item) {
      throw new RepositoryError(
        `${this.name} doesn't exist`,
        REPOSITORY_CODES.NON_EXIST_ENTITY
      );
    }

    return this.toResponse(item);
  }

  async create(item) {
    if (!this.Entity.isValidArgs(item)) {
      throw new RepositoryError(
        'Unknown Entity',
        REPOSITORY_CODES.INVALID_ENTITY
      );
    }

    const newItem = new this.Entity(item);

    this.items.push(newItem);

    return this.toResponse(newItem);
  }

  async deleteBy(condition) {
    const deletedItems = this.items.filter((item) => !condition(item));
    this.items = this.items.filter(condition);

    return deletedItems;
  }

  async deleteOne(id) {
    const index = this.items.findIndex((entity) => entity.id === id);

    if (index === -1) {
      throw new RepositoryError(
        `${this.name} doesn't exist`,
        REPOSITORY_CODES.NON_EXIST_ENTITY
      );
    }

    const deletedItem = this.items.splice(index, 1)[0];

    return this.toResponse(deletedItem);
  }

  async updateOne(id, newFields) {
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
    };

    return this.toResponse(this.items[index]);
  }
}

module.exports = { Repository };
