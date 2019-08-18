import attempt from 'attempt-x';
import isRegExp from 'is-regexp-x';
import toStr from 'to-string-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toBoolean from 'to-boolean-x';
import methodize from 'simple-methodize-x';

const EMPTY_STRING = '';
const indexOf = methodize(EMPTY_STRING.indexOf);
const {includes: ni} = EMPTY_STRING;
const nativeIncludes = typeof ni === 'function' && ni;
const methodizedIncludes = nativeIncludes && methodize(nativeIncludes);

const test1 = function test1() {
  return attempt(methodizedIncludes, '/a/', /a/).threw;
};

const test2 = function test2() {
  const res = attempt(methodizedIncludes, 'abc', 'a', Infinity);

  return res.threw === false && res.value === false;
};

const test3 = function test3() {
  const res = attempt(methodizedIncludes, 123, '2');

  return res.threw === false && res.value === true;
};

const test4 = function test4() {
  return attempt(methodizedIncludes, null, 'u').threw;
};

const isWorking = toBoolean(methodizedIncludes) && test1() && test2() && test3() && test4();

const assertRegex = function assertRegex(searchString) {
  if (isRegExp(searchString)) {
    throw new TypeError('"includes" does not accept a RegExp');
  }

  return searchString;
};

const patchedIncludes = function includes(string, searchString) {
  /* eslint-disable-next-line prefer-rest-params */
  return methodizedIncludes(requireObjectCoercible(string), assertRegex(searchString), arguments[2]);
};

export const implementation = function includes(string, searchString) {
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
const $includes = isWorking ? patchedIncludes : implementation;

export default $includes;
