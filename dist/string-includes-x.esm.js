import attempt from 'attempt-x';
import isRegExp from 'is-regexp-x';
import toStr from 'to-string-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toBoolean from 'to-boolean-x';
var EMPTY_STRING = '';
var ni = EMPTY_STRING.includes;
var nativeIncludes = typeof ni === 'function' && ni;

var test1 = function test1() {
  return attempt.call('/a/', nativeIncludes, /a/).threw;
};

var test2 = function test2() {
  var res = attempt.call('abc', nativeIncludes, 'a', Infinity);
  return res.threw === false && res.value === false;
};

var test3 = function test3() {
  var res = attempt.call(123, nativeIncludes, '2');
  return res.threw === false && res.value === true;
};

var test4 = function test4() {
  var res = attempt.call(null, nativeIncludes, 'u');
  return res.threw;
};

var isWorking = toBoolean(nativeIncludes) && test1() && test2() && test3() && test4();

var assertRegex = function assertRegex(searchString) {
  if (isRegExp(searchString)) {
    throw new TypeError('"includes" does not accept a RegExp');
  }

  return searchString;
};

var patchedIncludes = function patchedIncludes() {
  return function includes(string, searchString) {
    requireObjectCoercible(string);
    var args = [assertRegex(searchString)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeIncludes.apply(string, args);
  };
};

export var implementation = function implementation() {
  var indexOf = EMPTY_STRING.indexOf;
  return function includes(string, searchString) {
    var str = toStr(requireObjectCoercible(string));
    assertRegex(searchString);
    var args = [toStr(searchString)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    } // Somehow this trick makes method 100% compat with the spec.


    return indexOf.apply(str, args) !== -1;
  };
};
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
 */

var $includes = isWorking ? patchedIncludes() : implementation();
export default $includes;

//# sourceMappingURL=string-includes-x.esm.js.map