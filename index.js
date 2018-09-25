var path = require('path')

function cannotSet (prop) {
  return `Cannot set Path property '${prop}'`
}

class Path extends String {
  constructor (...args) {
    var parts = args.map(part => {
      if (part instanceof Path) {
        return path.normalize(part.full)
      }
      return path.normalize(part)
    })

    super(path.join(...parts))
  }

  static from (...args) {
    return new Path(...args)
  }

  static get delimiter () {
    return path.delimiter
  }

  static set delimiter (_) {
    throw new Error(cannotSet('delimiter'))
  }

  static get sep () {
    return path.sep
  }

  static set sep (_) {
    return new Error(cannotSet('sep'))
  }

  to (dest) {
    if (dest instanceof Path) {
      dest = dest.valueOf()
    }
    return path.relative(this.valueOf(), dest)
  }

  get abs () {
    return path.isAbsolute(this.valueOf())
  }

  set abs (_) {
    throw new Error(cannotSet('abs'))
  }

  get base () {
    return this.parsed.base
  }

  set base (base) {
    throw new Error(cannotSet('base'))
  }

  get crumbs () {
    if (this.cache && this.cache.crumbs) {
      return this.cache.crumbs
    }
    var crumbs = this.dir.split(path.sep)
    this.cache.crumbs = crumbs
    return crumbs
  }

  set crumbs (_) {
    throw new Error(cannotSet('crumbs', 'dir'))
  }

  get dir () {
    return this.parsed.dir
  }

  set dir (dir) {
    throw new Error(cannotSet('dir'))
  }

  get ext () {
    return this.parsed.ext
  }

  set ext (ext) {
    throw new Error(cannotSet('ext'))
  }

  get name () {
    return this.parsed.name
  }

  set name (name) {
    throw new Error(cannotSet('name'))
  }

  get parsed () {
    if (!this.cache) {
      this.cache = path.parse(this.valueOf())
    }
    return this.cache
  }

  set parsed (_) {
    throw new Error(cannotSet('parsed'))
  }

  get res () {
    return path.resolve(this.valueOf())
  }

  set res (_) {
    throw new Error(cannotSet('res'))
  }

  get root () {
    return this.parsed.root
  }

  set root (_) {
    throw new Error(cannotSet('root'))
  }
}

module.exports = Path
