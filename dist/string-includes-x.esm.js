import attempt from 'attempt-x';
import isRegExp from 'is-regexp-x';
import toStr from 'to-string-x';
import requireObjectCoercible from 'require-object-coercible-x';
var ni = ''.includes;
var nativeIncludes = typeof ni === 'function' && ni;
var isWorking;

if (nativeIncludes) {
  var res = attempt.call('/a/', nativeIncludes, /a/);
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
    res = attempt.call(null, nativeIncludes, 'u');
    isWorking = res.threw;
  }
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
 */


var $includes;

if (isWorking) {
  $includes = function includes(string, searchString) {
    var args = [searchString];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    }

    return nativeIncludes.apply(string, args);
  };
} else {
  var indexOf = String.prototype.indexOf;

  $includes = function includes(string, searchString) {
    var str = toStr(requireObjectCoercible(string));

    if (isRegExp(searchString)) {
      throw new TypeError('"includes" does not accept a RegExp');
    }

    var args = [toStr(searchString)];

    if (arguments.length > 2) {
      /* eslint-disable-next-line prefer-rest-params,prefer-destructuring */
      args[1] = arguments[2];
    } // Somehow this trick makes method 100% compat with the spec.


    return indexOf.apply(str, args) !== -1;
  };
}

var inc = $includes;
export default inc;

//# sourceMappingURL=string-includes-x.esm.js.map