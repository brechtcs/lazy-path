# lazy-path

Wrapper around the NodeJS `path` module that lazily returns the properties of a parsed path. It also normalizes and joins any input by default.

## Usage

```js
var Path = require('lazy-path')

var path = Path.from('path/to/file.txt')
console.log(path.dir) // 'path/to'
console.log(path.base) // 'file.txt'
console.log(path.name) // 'file'
console.log(path.ext) // '.txt'

// The `crumbs` property gives an array of the directies in the path
console.log(path.crumbs) // ['path', 'to']

// `abs` is a boolean answering whether the path is absolute or not
console.log(path.abs) // false

// `res` gives the resolved absolute path
console.log(path.res) // e.g. '/home/user/path/to/other.jpg'

// Using the `from` constructor with multiple arguments will join (and normalize) the path
var another = Path.from('another', 'file.txt')
console.log(another.toString()) // 'another/file.txt'

// The replacement for Node's `path.relative` is the `to` method
Path.from('one/file.txt').to(another) // '../another'
```

## Todo

- [ ] Make it even more lazy ([Issue #1](https://github.com/brechtcs/lazy-path/issues/1))
- [ ] Cache the `res` property ([Issue #2](https://github.com/brechtcs/lazy-path/issues/2))

## License

Apache-2.0
