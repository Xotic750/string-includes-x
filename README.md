<a href="https://travis-ci.org/Xotic750/string-includes-x"
   title="Travis status">
<img
   src="https://travis-ci.org/Xotic750/string-includes-x.svg?branch=master"
   alt="Travis status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/string-includes-x"
   title="Dependency status">
<img src="https://david-dm.org/Xotic750/string-includes-x.svg"
   alt="Dependency status" height="18"/>
</a>
<a href="https://david-dm.org/Xotic750/string-includes-x#info=devDependencies"
   title="devDependency status">
<img src="https://david-dm.org/Xotic750/string-includes-x/dev-status.svg"
   alt="devDependency status" height="18"/>
</a>
<a href="https://badge.fury.io/js/string-includes-x" title="npm version">
<img src="https://badge.fury.io/js/string-includes-x.svg"
   alt="npm version" height="18"/>
</a>
<a name="module_string-includes-x"></a>

## string-includes-x
Determines whether one string may be found within another string.

**Version**: 1.0.0  
**Author**: Xotic750 <Xotic750@gmail.com>  
**License**: [MIT](&lt;https://opensource.org/licenses/MIT&gt;)  
**Copyright**: Xotic750  
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

**Params**: <code>string</code> searchString - A string to be searched for within the
 target string.  
**Params**: <code>number</code> [position] -The position within the string at which to begin
 searching for searchString.(defaults to 0).  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The target string. |

**Example**  
```js
var strIncludes = require('string-includes-x');

var str = 'To be, or not to be, that is the question.';

includes(str, 'To be'); // true
includes(str, 'question'); // true
includes(str, 'nonexistent'); // false
includes(str, 'To be', 1); // false
includes(str, ('TO BE'); // false
```
