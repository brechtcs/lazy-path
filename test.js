var Path = require('./')
var nodepath = require('path')
var test = require('tape')

test('parsing', function (t) {
  var path = Path.from('path', 'to', 'file.txt')
  t.equal(path.toString(), nodepath.join('path', 'to', 'file.txt'), 'get full path')
  t.notOk(path.cache, 'cache empty')

  t.equal(path.base, 'file.txt', 'get file basename')
  t.equal(typeof path.cache, 'object', 'cache populated')
  t.equal(path.dir, nodepath.join('path', 'to'), 'get file dirname')
  t.equal(path.ext, '.txt', 'get file extension')
  t.equal(path.name, 'file', 'get file name')

  t.end()
})

test('normalization', function (t) {
  var path = Path.from('path', 'to', 'somewhere', '..', 'actually', 'somewhere', 'else.txt')
  t.equal(path.toString(), nodepath.join('path', 'to', 'actually', 'somewhere', 'else.txt'), 'path normalized')
  t.end()
})

test('breadcrumbs', function (t) {
  var path = Path.from('deeply', 'nested', 'directory', 'tree.txt')
  t.notOk(path.cache, 'cache empty')
  t.ok(Array.isArray(path.crumbs), 'get breadcrumbs')
  t.ok(Array.isArray(path.cache.crumbs), 'crumbs cache populated')
  t.equal(path.crumbs.length, 3, 'directory tree count')
  t.end()
})

test('string methods', function (t) {
  var path = Path.from('some', 'folder')
  t.ok(path instanceof String, 'is String object')
  t.ok(path.length, 'has length')
  t.ok(path.indexOf('folder') > -1, 'indexOf method')
  t.equal(path.substring(0, 5), 'some/', 'substring method')
  t.end()
})
