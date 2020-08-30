const chinese_to_pinyin = require('chinese-to-pinyin');

const initial_list = ['zh', 'ch', 'sh', 'z', 'c', 's', 'b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'y', 'w', ''];
const initial_type_list = [['ch', 'sh', 'zh', 'z', 'c', 's'], ['b', 'p', 'm', 'f', 'd', 't', 'n', 'l', 'g', 'k', 'h', 'j', 'q', 'x', 'r', 'y', 'w', '']];
const final_without_tone_list = [
  ['a', 'ia', 'ua'],
  ['o', 'uo'],
  ['e'],
  ['ie', 'ue', 've'],
  ['i'],
  ['er'],
  ['i'],
  ['ei', 'ui'],
  ['ai', 'uai'],
  ['u'],
  ['v', 'ü'],
  ['ou', 'iu'],
  ['ao', 'iao'],
  ['an', 'ian', 'uan'],
  ['en', 'in', 'un'],
  ['ang', 'uang', 'iang'],
  ['eng', 'ing'],
  ['ong', 'iong'],
];

const final_with_tone_list = [
  [['ā', 'iā', 'uā'], ['á', 'iá', 'uá'], ['ǎ', 'iǎ', 'uǎ'], ['à', 'ià', 'uà'], ['a', 'ia', 'ua']],
  [['ō', 'uō'], ['ó', 'uó'], ['ǒ', 'uǒ'], ['ò', 'uò'], ['o', 'uo']],
  [['ē'], ['é'], ['ě'], ['è'], ['e']],
  [['iē', 'uē', 'vē'], ['ié', 'ué', 'vé'], ['iě', 'uě', 'vě'], ['iè', 'uè', 'vè'], ['ie', 'ue', 've']],
  [['ī'], ['í'], ['ǐ'], ['ì'], ['i']],
  [['ēr'], ['ér'], ['ěr'], ['èr'], ['er']],
  [['ī'], ['í'], ['ǐ'], ['ì'], ['i']],
  [['ēi', 'uī'], ['éi', 'uí'], ['ěi', 'uǐ'], ['èi', 'uì'], ['ei', 'ui']],
  [['āi', 'uāi'], ['ái', 'uái'], ['ǎi', 'uǎi'], ['ài', 'uài'], ['ai', 'uai']],
  [['ū'], ['ú'], ['ǔ'], ['ù'], ['u']],
  [['v'], ['ü'], ['ǖ'], ['ǘ'], ['ǚ'], ['ǜ']],
  [['ōu', 'īu'], ['óu', 'íu'], ['ǒu', 'ǐu'], ['òu', 'ìu'], ['ou', 'iu']],
  [['āo', 'iāo'], ['áo', 'iáo'], ['ǎo', 'iǎo'], ['ào', 'iào'], ['ao', 'iao']],
  [['ān', 'iān', 'uān'], ['án', 'ián', 'uán'], ['ǎn', 'iǎn', 'uǎn'], ['àn', 'iàn', 'uàn'], ['an', 'ian', 'uan']],
  [['ēn', 'īn', 'ūn'], ['én', 'ín', 'ún'], ['ěn', 'ǐn', 'ǔn'], ['èn', 'ìn', 'ùn'], ['en', 'in', 'un']],
  [['āng', 'uāng', 'iāng'], ['áng', 'uáng', 'iáng'], ['ǎng', 'uǎng', 'iǎng'], ['àng', 'uàng', 'iàng'], ['ang', 'uang', 'iang']],
  [['ēng', 'īng'], ['éng', 'íng'], ['ěng', 'ǐng'], ['èng', 'ìng'], ['eng', 'ing']],
  [['ōng', 'iōng'], ['óng', 'ióng'], ['ǒng', 'iǒng'], ['òng', 'iòng'], ['ong', 'iong']],
];

module.exports.handleWord = (word = '', rate = 0) => {
  const pinyin_with_tone = chinese_to_pinyin(word);
  const pinyin_without_tone = chinese_to_pinyin(word, { removeTone: true });
  const pinyin_without_tone_array = pinyin_without_tone.split(' ');
  const initial_arr = [];
  const final_with_tone_arr = [];
  const final_without_tone_arr = [];
  const type_with_tone_arr = [];
  const type_without_tone_arr = [];
  const length = word.length;
  pinyin_with_tone.split(' ').forEach((pinyin, index) => {
    for (let item of initial_list) {
      if (pinyin.indexOf(item) === 0) {
        initial_arr.push(item);
        const final_with_tone = pinyin.replace(item, '');
        const final_without_tone = pinyin_without_tone_array[index].replace(item, '');
        for (let index = 0; index < final_without_tone_list.length; index++) {
          const item1 = final_without_tone_list[index];
          if (item1.includes(final_without_tone)) {
            // 五支和七齐
            if (index === 4 || index === 6) {
              if (initial_type_list[0].includes(item)) {
                type_without_tone_arr.push(5);
              } else {
                type_without_tone_arr.push(7);
              }
            } else {
              type_without_tone_arr.push(index + 1);
            }
            break;
          }
        }
        for (let index1 = 0; index1 < final_with_tone_list.length; index1++) {
          const item1 = final_with_tone_list[index1];
          let flag = false;
          for (let index2 = 0; index2 < item1.length; index2++) {
            const item2 = item1[index2];
            if (item2.includes(final_with_tone)) {
              flag = true;
              // 五支和七齐
              if (index1 === 4 || index1 === 6) {
                if (initial_type_list[0].includes(item)) {
                  type_with_tone_arr.push(`5.${index2 + 1}`);
                } else {
                  type_with_tone_arr.push(`7.${index2 + 1}`);
                }
              } else {
                type_with_tone_arr.push(`${index1 + 1}.${index2 + 1}`);
              }
              break;
            }
          }
          if (flag) {
            break;
          }
        }
        final_with_tone_arr.push(final_with_tone);
        final_without_tone_arr.push(final_without_tone);
        break;
      }
    }
  })
  return {
    word,
    rate,
    length,
    initial: initial_arr.join('-'),
    final_with_tone: final_with_tone_arr.join('-'),
    final_without_tone: final_without_tone_arr.join('-'),
    type_with_tone: type_with_tone_arr.join('-'),
    type_without_tone: type_without_tone_arr.join('-')
  }
}
