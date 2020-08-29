class BaseController {
  constructor(instance) {
    this.instance = instance
  }
  baseFindAll (attributes) {
    return this.instance.findAll(attributes)
  }
  baseFindByFilter (attributes, where) {
    return this.instance.findByFilter(attributes, where)
  }
  baseFindByFilterOrder (attributes, where, order) {
    return this.instance.findByFilterOrder(attributes, where, order)
  }
  baseFindLikeByFilter (attributes, where) {
    return this.instance.findLikeByFilter(attributes, where)
  }
  baseFindLikeByFilterOrder (attributes, where, order) {
    return this.instance.findLikeByFilterOrder(attributes, where, order)
  }
  baseFindAndCountAll (attributes, where) {
    return this.instance.findAndCountAll(attributes, where)
  }
  baseFindOne (attributes, where) {
    return this.instance.findOne(attributes, where)
  }
  baseUpdate (attributes, where) {
    return this.instance.update(attributes, where)
  }
  baseDelete (where) {
    return this.instance.delete(where)
  }
  baseCreate (entity) {
    return this.instance.create(entity)
  }
  baseCreateBatch (entitys) {
    return this.instance.createBatch(entitys)
  }
}
module.exports = BaseController;