const BaseController = require('./base.js');
const summaryModel = require('../models/summary');
const { handleWord } = require('../utils/handleWord');
const { success, paramErr } = require('../utils/response');
const { No } = require('../utils/type');

class SummaryController extends BaseController {
  constructor() {
    super(summaryModel)
  }
  // 新增多条词汇
  async addWords (arr) {
    await this.baseCreateBatch(arr);
    console.log('success!');
  }
  // 查询韵脚
  getWords (req, res, next) {
    getWords_fn(req, res, next, this)
  }
}

module.exports = new SummaryController();

/**
 * 新增一条词汇
 * @author 周立翔
 * @version 1.0 2020-8-16
 * @returns null 收件地址列表
 */
async function addWord_fn (req, res, next, that) {
}

/**
 * 查询多条词汇
 * @author 周立翔
 * @version 1.0 2020-8-22
 * @returns Array<Word> 韵脚列表
 */
async function getWords_fn (req, res, next, that) {
  let { word, rap_num, tone_type, length } = req.query;
  if (No([word, rap_num, tone_type, length])) {  // 验证参数
    paramErr(res);
    return
  }
  rap_num = parseInt(rap_num);
  tone_type = parseInt(tone_type);
  const result = handleWord(word);  // 获取处理后的单词拼音
  const type_without_tone_arr = result.type_without_tone.split('-');
  let type_without_tone = type_without_tone_arr.slice(-rap_num).join('-');
  type_without_tone = type_without_tone.includes('-') ? type_without_tone : `-${type_without_tone}`;
  const type_with_tone_arr = result.type_with_tone.split('-');
  const num = tone_type > 1 ? rap_num : tone_type;
  let type_with_tone = type_with_tone_arr.slice(-num).join('-');
  type_with_tone = type_with_tone.includes('-') ? type_with_tone : `-${type_with_tone}`;
  type_with_tone = num === 0 ? '' : type_with_tone;
  try {
    const data = await summaryModel.getBackUps(type_with_tone, type_without_tone, length)
    success(res, data)
  }
  catch (err) { next(err) }
}