var Path = require('./')
var nodepath = require('path')
var test = require('tape')

test('parsing', function (t) {
  var path = Path.from('path', 'to', 'file.txt')
  t.equal(path.full, nodepath.join('path', 'to', 'file.txt'), 'get full path')
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
  t.equal(path.full, nodepath.join('path', 'to', 'actually', 'somewhere', 'else.txt'), 'path normalized')
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

test('setters', function (t) {
  var path = Path.from('path', 'to', 'modify.txt')
  t.ok(path.base, 'populate cache')

  path.base = 'change.txt'
  t.equal(path.name, 'change', 'base: check name')
  t.equal(path.ext, '.txt', 'base: check ext')
  t.equal(path.full, nodepath.join('path', 'to', 'change.txt'), 'base: check full')

  path.dir = nodepath.join('folder', 'with')
  t.equal(path.dir, nodepath.join('folder', 'with'), 'dir: check dir')
  t.equal(path.full, nodepath.join('folder', 'with', 'change.txt'), 'dir: check full')
  t.equal(path.crumbs[0], 'folder', 'dir: check first crumb')
  t.equal(path.crumbs[1], 'with', 'dir: check second crumb')

  path.ext = '.jpg'
  t.equal(path.base, 'change.jpg', 'ext: check base')
  t.equal(path.full, nodepath.join('folder', 'with', 'change.jpg'), 'ext: check full')

  path.name = 'edit'
  t.equal(path.base, 'edit.jpg', 'name: check base')
  t.equal(path.full, nodepath.join('folder', 'with', 'edit.jpg'), 'name: check full')

  delete path.cache
  path.base = 'modify.jpg'
  t.equal(path.base, 'modify.jpg', 'without cache: check base')

  delete path.cache
  path.dir = 'dir'
  t.equal(path.dir, 'dir', 'without cache: check dir')

  delete path.cache
  path.ext = '.txt'
  t.equal(path.ext, '.txt', 'without cache: check ext')

  delete path.cache
  path.name = 'edit'
  t.equal(path.name, 'edit', 'without cache: check name')
  t.equal(path.full, nodepath.join('dir', 'edit.txt'), 'without cache: check full')
  t.end()
})
