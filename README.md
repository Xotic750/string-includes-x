<a
  href="https://travis-ci.org/Xotic750/string-includes-x"
  title="Travis status">
<img
  src="https://travis-ci.org/Xotic750/string-includes-x.svg?branch=master"
  alt="Travis status" height="18">
</a>
<a
  href="https://david-dm.org/Xotic750/string-includes-x"
  title="Dependency status">
<img src="https://david-dm.org/Xotic750/string-includes-x/status.svg"
  alt="Dependency status" height="18"/>
</a>
<a
  href="https://david-dm.org/Xotic750/string-includes-x?type=dev"
  title="devDependency status">
<img src="https://david-dm.org/Xotic750/string-includes-x/dev-status.svg"
  alt="devDependency status" height="18"/>
</a>
<a
  href="https://badge.fury.io/js/string-includes-x"
  title="npm version">
<img src="https://badge.fury.io/js/string-includes-x.svg"
  alt="npm version" height="18">
</a>
<a
  href="https://www.jsdelivr.com/package/npm/string-includes-x"
  title="jsDelivr hits">
<img src="https://data.jsdelivr.com/v1/package/npm/string-includes-x/badge?style=rounded"
  alt="jsDelivr hits" height="18">
</a>
<a
  href="https://bettercodehub.com/results/Xotic750/string-includes-x"
  title="bettercodehub score">
<img src="https://bettercodehub.com/edge/badge/Xotic750/string-includes-x?branch=master"
  alt="bettercodehub score" height="18">
</a>

<a name="module_string-includes-x"></a>

## string-includes-x

Determines whether one string may be found within another string.

<a name="exp_module_string-includes-x--module.exports"></a>

### `module.exports` ⇒ <code>boolean</code> ⏏

This method determines whether one string may be found within another string,
returning true or false as appropriate.

**Kind**: Exported member  
**Returns**: <code>boolean</code> - `true` if the given string is found anywhere within the
search string; otherwise, `false` if not.  
**Throws**:

- <code>TypeError</code> If target is null or undefined.
- <code>TypeError</code> If searchString is a RegExp.

| Param        | Type                | Description                                                                                  |
| ------------ | ------------------- | -------------------------------------------------------------------------------------------- |
| string       | <code>string</code> | The target string.                                                                           |
| searchString | <code>string</code> | A string to be searched for within the target string.                                        |
| [position]   | <code>number</code> | The position within the string at which to begin searching for searchString.(defaults to 0). |

**Example**

```js
import strIncludes from 'string-includes-x';

const str = 'To be, or not to be, that is the question.';

includes(str, 'To be'); // true
includes(str, 'question'); // true
includes(str, 'nonexistent'); // false
includes(str, 'To be', 1); // false
includes(str, ('TO BE'); // false
```
