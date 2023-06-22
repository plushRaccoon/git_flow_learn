function filter(cb, obj) {
  if (!cb) throw new Error('Here must be a callback');
  let result = [];
  this.forEach((item, idx, arr) => {
    if (cb.call(obj, item, idx, arr)) {
      result.push(item);
    }
  });
  return result;
};

module.exports = filter;
