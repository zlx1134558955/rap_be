let Sequelize = require('sequelize');
const db = require('../config/db.js');
let Op = Sequelize.Op;

class BaseModel {
  constructor(tableName, schema) {
    this.model = db.define(tableName, schema, {
      freezeTableName: true,
      timestamps: false
    });
  }
  // 返回实例化的sequelize模型实例
  getModel() {
    return this.model;
  }
  /***************************************查询方法*************************************/
  // 不带过滤条件的查询
  findAll(attributes) {
    return attributes
      ? this.model.findAll({ attributes: attributes })
      : this.model.findAll();
  }
  // 带过滤条件的精确查询并返回查询的数据条数
  findAndCountAll(attributes, where) {
    return attributes
      ? this.model.findAndCountAll({ attributes: attributes, where: where })
      : this.model.findAndCountAll({ where: where });
  }
  // 带过滤条件查询首次匹配项
  findOne(attributes, where) {
    return attributes
      ? this.model.findOne({ attributes: attributes, where: where })
      : this.model.findOne({ where: where });
  }
  /***************************************更新方法*************************************/
  // 当where为null则批量更新表；当where为条件则条件更新表
  update(attributes, where) {
    return where
      ? this.model.update(attributes, { where: where })
      : this.model.update(attributes, { where: {} });
  }
  /***************************************删除方法*************************************/
  // 条件删除
  delete(where) {
    return this.model.destroy({ where: where });
  }
  /***************************************插入方法*************************************/
  // 插入一条数据
  create(entity) {
    return this.model.create(entity);
  }
  // 插入多条数据
  createBatch(entitys) {
    return this.model.bulkCreate(entitys);
  }
}
module.exports = BaseModel;
