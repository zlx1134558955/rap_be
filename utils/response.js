module.exports.success = (res, data) => {
  const obj = {
    code: 0,
    message: 'success',
    data: data
  };
  res.json(obj);
};

module.exports.paramErr = res => {
  const obj = {
    code: 400,
    message: '参数错误',
    data: null
  };
  res.json(obj);
};
