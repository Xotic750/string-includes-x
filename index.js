/**
 * @file Determines whether one string may be found within another string.
 * @version 1.0.0
 * @author Xotic750 <Xotic750@gmail.com>
 * @copyright  Xotic750
 * @license {@link <https://opensource.org/licenses/MIT> MIT}
 * @module string-includes-x
 */

'use strict';

var nativeIncludes = String.prototype.includes;

var $includes;
if (nativeIncludes) {
  try {
    if (nativeIncludes.call('a', 'a', Infinity) !== false) {
      throw new Error('failed');
    }

    $includes = function includes(string, searchString) {
      var args = [searchString];
      if (arguments.length > 2) {
        args[1] = arguments[2];
      }

      return nativeIncludes.apply(string, args);
    };
  } catch (ignore) {}
}

if (Boolean($includes) === false) {
  var isRegExp = require('is-regex');
  var toStr = require('to-string-x');
  var requireObjectCoercible = require('require-object-coercible-x');
  var indexOf = String.prototype.indexOf;

  $includes = function includes(string, searchString) {
    var str = toStr(requireObjectCoercible(string));
    if (isRegExp(searchString)) {
      throw new TypeError('"includes" does not accept a RegExp');
    }

    var args = [toStr(searchString)];
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
 * @param {string} string The target string.
 * @throws {TypeError} If target is null or undefined.
 * @params {string} searchString - A string to be searched for within the
 *  target string.
 * @throws {TypeError} If searchString is a RegExp.
 * @return {boolean} `true` if the given string is found anywhere within the
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
module.exports = $includes;
