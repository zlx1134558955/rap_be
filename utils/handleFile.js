// 处理txt并初始化数据库，可无需此文件
const fs = require('fs');
const { handleWord } = require('./handleWord');
const SummaryController = require('../controllers/summary.js')

const handleFile = file_path => {
  const data = fs.readFileSync(file_path, 'utf-8');
  const result = [];
  const lines = data.split('\n');
  let i = 0;
  lines.forEach(line => {
    line = line.replace(/\s+/, ' ');
    const item = line.split(' ');
    result.push(handleWord(item[0], Number(item[1]) || 0));
    console.log(++i)
  })
  SummaryController.addWords(result);
}

handleFile('./public/dict.txt');
// handleFile('./public/THUOCL_animal.txt');
// handleFile('./public/THUOCL_caijing.txt');
// handleFile('./public/THUOCL_car.txt');
// handleFile('./public/THUOCL_chengyu.txt');
// handleFile('./public/THUOCL_place.txt');
// handleFile('./public/THUOCL_food.txt');
// handleFile('./public/THUOCL_it.txt');
// handleFile('./public/THUOCL_law.txt');
// handleFile('./public/THUOCL_lishimingren.txt');
// handleFile('./public/THUOCL_medical.txt');
// handleFile('./public/THUOCL_poem.txt');