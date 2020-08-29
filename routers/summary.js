const express = require('express')
const SummaryController = require('../controllers/summary')
const router = express.Router()
class SummaryRouter {
  static initRouter () {
    router.get('/', (req, res, next) => SummaryController.getWords(req, res, next))
    return router
  }
}
module.exports = SummaryRouter.initRouter()