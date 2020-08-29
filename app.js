const express = require('express')
const cors = require('cors')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
app.listen(8801, () => {
  console.log('Server start on 8801...')
})

// 配置CORS相关
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', "OPTIONS"],
  allowHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}))

// 引入body-parser包
app.use(bodyParser.json())

app.use('/summary', require('./routers/summary'))


// 错误处理中间件
app.use(function (req, res, next) {
  let err = new Error('Not Found')
  err.status = 404
  res.json({ error: err })
})
app.use(errorHandler);
function errorHandler (err, req, res, next) {
  console.error(err)
  res.json({ error: err })
}