var assert = require('assert')
var path = require('path')

function cannotSet (prop, alt) {
  var msg = `Cannot set Path property '${prop}'`
  if (alt) {
    msg += `, maybe you want to set '${alt}' instead?`
  }
  return msg
}

class Path {
  constructor (...args) {
    var parts = args.map(part => {
      if (part instanceof Path) {
        return path.normalize(part.full)
      }
      return path.normalize(part)
    })
    this.str = path.join(...parts)
  }

  static from (...args) {
    return new Path(...args)
  }

  static get delimiter () {
    return path.delimiter
  }

  static set delimiter () {
    throw new Error(cannotSet('delimiter'))
  }

  static get sep () {
    return path.sep
  }

  static set sep () {
    return new Error(cannotSet('sep'))
  }

  to (dest) {
    if (dest instanceof Path) {
      dest = dest.toString()
    }
    return path.relative(this.str, dest)
  }

  toString () {
    return this.str
  }

  get abs () {
    return path.isAbsolute(this.str)
  }

  set abs () {
    throw new Error(cannotSet('abs'))
  }

  get base () {
    return this.parsed.base
  }

  set base (base) {
    assert.equal(typeof base, 'string', 'Path.base must be a string')
    if (this.cache) {
      this.cache.base = base
      this.cache.ext = path.extname(base)
      this.cache.name = path.basename(base, this.parsed.ext)
      this.str = path.join(this.parsed.dir, base)
    } else {
      this.str = path.join(path.dirname(this.str), base)
    }
  }

  set cache () {
    throw new Error(cannotSet('cache'))
  }

  get crumbs () {
    if (this.cache && this.cache.crumbs) {
      return this.cache.crumbs
    }
    var crumbs = this.dir.split(path.sep)
    this.cache.crumbs = crumbs
    return crumbs
  }

  set crumbs () {
    throw new Error(cannotSet('crumbs', 'dir'))
  }

  get dir () {
    return this.parsed.dir
  }

  set dir (dir) {
    assert.equal(typeof dir, 'string', 'Path.dir must be a string')
    if (this.cache) {
      delete this.cache.crumbs
      this.cache.dir = dir
      this.str = path.join(dir, this.parsed.base)
    } else {
      this.str = path.join(dir, path.basename(this.str))
    }
  }

  get ext () {
    return this.parsed.ext
  }

  set ext (ext) {
    assert.equal(typeof ext, 'string', 'Path.ext must be a string')
    if (this.cache) {
      this.cache.base = this.parsed.name + ext
      this.cache.ext = ext
      this.str = path.join(this.parsed.dir, this.parsed.base)
    } else {
      var oldExt = this.cache ? this.parsed.ext : path.extname(this.str)
      this.str = path.join(path.dirname(this.str), path.basename(this.str, oldExt) + ext)
    }
  }

  get full () {
    return this.str
  }

  set full (full) {
    assert.equal(typeof full, 'string', 'Path.full must be a string')
    delete this.cache
    this.str = path.normalize(full)
  }

  get name () {
    return this.parsed.name
  }

  set name (name) {
    assert.equal(typeof.name, 'string', 'Path.name must be a string')
    if (this.cache) {
      this.cache.base = name + this.parsed.ext
      this.cache.name = name
      this.str = path.join(this.parsed.dir, this.parsed.base)
    } else {
      this.str = path.join(path.dirname(this.str), name + path.extname(this.str))
    }
  }

  get parsed () {
    if (!this.cache) {
      this.cache = path.parse(this.str)
    }
    return this.cache
  }

  set parsed () {
    throw new Error(cannotSet('parsed'))
  }

  get res () {
    return path.resolve(this.str)
  }

  set res () {
    throw new Error(cannotSet('res'))
  }

  get root () {
    return this.parsed.root
  }

  set root () {
    throw new Error(cannotSet('root', 'dir'))
  }

  set str () {
    throw new Error(cannotSet('str', 'full'))
  }
}

module.exports = Path
