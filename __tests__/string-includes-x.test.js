let includes;

if (typeof module === 'object' && module.exports) {
  require('es5-shim');
  require('es5-shim/es5-sham');

  if (typeof JSON === 'undefined') {
    JSON = {};
  }

  require('json3').runInContext(null, JSON);
  require('es6-shim');
  const es7 = require('es7-shim');
  Object.keys(es7).forEach(function(key) {
    const obj = es7[key];

    if (typeof obj.shim === 'function') {
      obj.shim();
    }
  });
  includes = require('../../index.js');
} else {
  includes = returnExports;
}

describe('includes', function() {
  it('is a function', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(typeof includes).toBe('function');
  });

  it('should throw when target is null or undefined', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(function() {
      includes();
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      includes(void 0);
    }).toThrowErrorMatchingSnapshot();

    expect(function() {
      includes(null);
    }).toThrowErrorMatchingSnapshot();
  });

  it('throws a TypeError when given a regex', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(function() {
      includes('foo', /a/g);
    }).toThrowErrorMatchingSnapshot();
  });

  it('should be truthy on correct results', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(includes('test', 'es')).toBe(true);
    expect(includes('abc', 'a')).toBe(true);
    expect(includes('abc', 'b')).toBe(true);
    expect(includes('abc', 'abc')).toBe(true);
    expect(includes('abc', 'bc')).toBe(true);
    expect(includes('abc', 'd')).toBe(false);
    expect(includes('abc', 'abcd')).toBe(false);
    expect(includes('abc', 'ac')).toBe(false);
    expect(includes('abc', 'abc', 0)).toBe(true);
    expect(includes('abc', 'bc', 0)).toBe(true);
    expect(includes('abc', 'de', 0)).toBe(false);
    expect(includes('abc', 'bc', 1)).toBe(true);
    expect(includes('abc', 'c', 1)).toBe(true);
    expect(includes('abc', 'a', 1)).toBe(false);
    expect(includes('abc', 'abc', 1)).toBe(false);
    expect(includes('abc', 'c', 2)).toBe(true);
    expect(includes('abc', 'd', 2)).toBe(false);
    expect(includes('abc', 'dcd', 2)).toBe(false);
    expect(includes('abc', 'ab', NaN)).toBe(true);
    expect(includes('abc', 'cd', NaN)).toBe(false);
  });

  it('should handle large positions', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(includes('abc', 'a', 42)).toBe(false);
    expect(includes('abc', 'a', Infinity)).toBe(false);
  });

  it('should handle negative positions', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(includes('abc', 'ab', -43)).toBe(true);
    expect(includes('abc', 'cd', -42)).toBe(false);
    expect(includes('abc', 'ab', -Infinity)).toBe(true);
    expect(includes('abc', 'cd', -Infinity)).toBe(false);
  });

  it('should be falsy on incorrect results', function() {
    expect.assertions(1);
    expect.assertions(1);
    expect(includes('test', '1290')).toBe(false);
  });
});
