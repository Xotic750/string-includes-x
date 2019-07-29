import attempt from 'attempt-x';
import isRegExp from 'is-regexp-x';
import toStr from 'to-string-x';
import requireObjectCoercible from 'require-object-coercible-x';
import toBoolean from 'to-boolean-x';

const EMPTY_STRING = '';
const ni = EMPTY_STRING.includes;
const nativeIncludes = typeof ni === 'function' && ni;

const test1 = function test1() {
  return attempt.call('/a/', nativeIncludes, /a/).threw;
};

const test2 = function test2() {
  const res = attempt.call('abc', nativeIncludes, 'a', Infinity);

  return res.threw === false && res.value === false;
};

const test3 = function test3() {
  const res = attempt.call(123, nativeIncludes, '2');

  return res.threw === false && res.value === true;
};

const test4 = function test4() {
  const res = attempt.call(null, nativeIncludes, 'u');

  return res.threw;
};

const isWorking = toBoolean(nativeIncludes) && test1() && test2() && test3() && test4();

const assertRegex = function assertRegex(searchString) {
  if (isRegExp(searchString)) {
    throw new TypeError('"includes" does not accept a RegExp');
  }

  return searchString;
};

const patchedIncludes = function patchedIncludes() {
  return function includes(string, searchString) {
    requireObjectCoercible(string);

    const args = [assertRegex(searchString)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeIncludes.apply(string, args);
  };
};

export const implementation = function implementation() {
  const {indexOf} = EMPTY_STRING;

  return function includes(string, searchString) {
    const str = toStr(requireObjectCoercible(string));
    assertRegex(searchString);
    const args = [toStr(searchString)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    // Somehow this trick makes method 100% compat with the spec.
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
const $includes = isWorking ? patchedIncludes() : implementation();

export default $includes;
