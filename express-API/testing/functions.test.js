const filter = require('./functions');
Array.prototype.customFilter = filter;
const cb = (item, index, array) => item > 2;
const cb1 = (item, index, array) => item > 10;

test('[1, 2, 3] to equal [3]', () => {
  expect([1, 2, 3].customFilter(cb)).toStrictEqual([1, 2, 3].filter(cb));
});

test('[1, 2, 3, 4, 5] to equal []', () => {
  expect([1, 2, 3, 4, 5].customFilter(cb1)).toStrictEqual([1, 2, 3, 4, 5].filter(cb1));
});

test('should throw an error if called without an arg', () => {
  expect(() => {
    [1, 2, 3, 4, 5].customFilter();
  }).toThrow(Error);
});
