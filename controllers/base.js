class BaseController {
  constructor(instance) {
    this.instance = instance;
  }
  baseFindAll(attributes) {
    return this.instance.findAll(attributes);
  }
  baseFindAndCountAll(attributes, where) {
    return this.instance.findAndCountAll(attributes, where);
  }
  baseFindOne(attributes, where) {
    return this.instance.findOne(attributes, where);
  }
  baseUpdate(attributes, where) {
    return this.instance.update(attributes, where);
  }
  baseDelete(where) {
    return this.instance.delete(where);
  }
  baseCreate(entity) {
    return this.instance.create(entity);
  }
  baseCreateBatch(entitys) {
    return this.instance.createBatch(entitys);
  }
}
module.exports = BaseController;
