module.exports.No = (arr) => {
  let flag = false;
  for (let i = 0; i < arr.length; i++) {
    const param = arr[i];
    if (param === undefined || param === null) {
      flag = true;
      break;
    }
  }
  return flag;
}