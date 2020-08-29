let Sequelize = require('sequelize')
const BaseModel = require('./base.js')
let Op = Sequelize.Op
class SummaryModel extends BaseModel {
  constructor() {
    super('summary', {
      word: { type: Sequelize.STRING },
      rate: { type: Sequelize.INTEGER },
      initial: { type: Sequelize.STRING },
      final_with_tone: { type: Sequelize.STRING },
      final_without_tone: { type: Sequelize.STRING },
      type_with_tone: { type: Sequelize.STRING },
      type_without_tone: { type: Sequelize.STRING },
    })
    this.model = super.getModel()
    this.model.sync()
  }
  getBackUps (type_with_tone, type_without_tone) {
    return this.model.findAll({
      where: {
        type_without_tone: { [Op.like]: `%${type_without_tone}` },
        type_with_tone: { [Op.like]: `%${type_with_tone}` }
      },
      offset: 0,
      limit: 100,
      order: [
        ['rate', 'DESC']
      ]
    })
  }
}
module.exports = new SummaryModel()