import attempt from 'attempt-x';
import isRegExp from 'is-regexp-x';
import toStr from 'to-string-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toBoolean from 'to-boolean-x';
import methodize from 'simple-methodize-x';
var EMPTY_STRING = '';
var indexOf = methodize(EMPTY_STRING.indexOf);
var ni = EMPTY_STRING.includes;
var nativeIncludes = typeof ni === 'function' && ni;
var methodizedIncludes = nativeIncludes && methodize(nativeIncludes);

var test1 = function test1() {
  return attempt(methodizedIncludes, '/a/', /a/).threw;
};

var test2 = function test2() {
  var res = attempt(methodizedIncludes, 'abc', 'a', Infinity);
  return res.threw === false && res.value === false;
};

var test3 = function test3() {
  var res = attempt(methodizedIncludes, 123, '2');
  return res.threw === false && res.value === true;
};

var test4 = function test4() {
  return attempt(methodizedIncludes, null, 'u').threw;
};

var isWorking = toBoolean(methodizedIncludes) && test1() && test2() && test3() && test4();

var assertRegex = function assertRegex(searchString) {
  if (isRegExp(searchString)) {
    throw new TypeError('"includes" does not accept a RegExp');
  }

  return searchString;
};

var patchedIncludes = function includes(string, searchString) {
  /* eslint-disable-next-line prefer-rest-params */
  return methodizedIncludes(requireObjectCoercible(string), assertRegex(searchString), arguments[2]);
};

export var implementation = function includes(string, searchString) {
  // Somehow this trick makes method 100% compat with the spec.

  /* eslint-disable-next-line prefer-rest-params */
  return indexOf(toStr(requireObjectCoercible(string)), toStr(assertRegex(searchString)), arguments[2]) !== -1;
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

var $includes = isWorking ? patchedIncludes : implementation;
export default $includes;

//# sourceMappingURL=string-includes-x.esm.js.map