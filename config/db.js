const Sequelize = require('sequelize')
const { db_user, db_password, db_database, db_host, db_port } = require('./person');

const config = {
  user: db_user,
  password: db_password,
  database: db_database,
}
const db = new Sequelize(config['database'], config['user'], config['password'], {
  host: db_host,
  port: db_port,
  dialect: 'mysql'
})

db.authenticate().then(() => {
  console.log('数据库连接成功...')
}).catch(err => {
  console.log('数据库连接失败...', err)
})
module.exports = db