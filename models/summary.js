let Sequelize = require('sequelize');
const BaseModel = require('./base.js');
let Op = Sequelize.Op;
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
      length: { type: Sequelize.INTEGER }
    });
    this.model = super.getModel();
    this.model.sync();
  }
  getBackUps(word, type_with_tone, type_without_tone, length, num) {
    if (length >= 5) {
      return this.model.findAll({
        where: {
          word: { [Op.ne]: word },
          [Op.or]: [
            { type_without_tone: { [Op.like]: `%-${type_without_tone}` } },
            { type_without_tone: { [Op.eq]: `${type_without_tone}` } }
          ],
          type_with_tone: { [Op.like]: `%${type_with_tone}` },
          length: { [Op.gte]: length }
        },
        offset: 0,
        limit: num || 50,
        order: [['rate', 'DESC']]
      });
    }
    return this.model.findAll({
      where: {
        word: { [Op.ne]: word },
        type_with_tone: { [Op.like]: `%${type_with_tone}` },
        length: { [Op.eq]: length || 2 },
        [Op.or]: [
          { type_without_tone: { [Op.like]: `%-${type_without_tone}` } },
          { type_without_tone: { [Op.eq]: `${type_without_tone}` } }
        ]
      },
      offset: 0,
      limit: num || 50,
      order: [['rate', 'DESC']]
    });
  }
}
module.exports = new SummaryModel();
