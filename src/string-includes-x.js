/**
 * @file Determines whether one string may be found within another string.
 * @version 1.1.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module string-includes-x
 */

const nativeIncludes = typeof String.prototype.includes === 'function' && String.prototype.includes;

let isWorking;

if (nativeIncludes) {
  const attempt = require('attempt-x');
  let res = attempt.call('/a/', nativeIncludes, /a/);
  isWorking = res.threw;

  if (isWorking) {
    res = attempt.call('abc', nativeIncludes, 'a', Infinity);
    isWorking = res.threw === false && res.value === false;
  }

  if (isWorking) {
    res = attempt.call(123, nativeIncludes, '2');
    isWorking = res.threw === false && res.value === true;
  }

  if (isWorking) {
    // eslint-disable-next-line no-useless-call
    res = attempt.call(null, nativeIncludes, 'u');
    isWorking = res.threw;
  }
}

let $includes;

if (isWorking) {
  $includes = function includes(string, searchString) {
    const args = [searchString];

    if (arguments.length > 2) {
      args[1] = arguments[2];
    }

    return nativeIncludes.apply(string, args);
  };
} else {
  const isRegExp = require('is-regexp-x');
  const toStr = require('to-string-x');
  const requireObjectCoercible = require('require-object-coercible-x');
  const {indexOf} = String.prototype;

  $includes = function includes(string, searchString) {
    const str = toStr(requireObjectCoercible(string));

    if (isRegExp(searchString)) {
      throw new TypeError('"includes" does not accept a RegExp');
    }

    const args = [toStr(searchString)];

    if (arguments.length > 2) {
      args[1] = arguments[2];
    }

    // Somehow this trick makes method 100% compat with the spec.
    return indexOf.apply(str, args) !== -1;
  };
}

/**
 * This method determines whether one string may be found within another string,
 * returning true or false as appropriate.
 *
 * @param {string} string - The target string.
 * @throws {TypeError} If target is null or undefined.
 * @param {string} searchString - A string to be searched for within the
 *  target string.
 * @throws {TypeError} If searchString is a RegExp.
 * @param {number} [position] -The position within the string at which to begin
 *  searching for searchString.(defaults to 0).
 * @returns {boolean} `true` if the given string is found anywhere within the
 *  search string; otherwise, `false` if not.
 * @example
 * var strIncludes = require('string-includes-x');
 *
 * var str = 'To be, or not to be, that is the question.';
 *
 * includes(str, 'To be'); // true
 * includes(str, 'question'); // true
 * includes(str, 'nonexistent'); // false
 * includes(str, 'To be', 1); // false
 * includes(str, ('TO BE'); // false
 */
export default $includes;
