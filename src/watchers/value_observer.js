goog.module('watchers.observer')

let IO = null

if (typeof window.IntersectionObserver === 'undefined') {
  IO = class {
    observe (node) {
      node.__is_visible = true
    }
  }
} else {
  IO = window.IntersectionObserver
}

class ValueObserver {
  constructor () {
    this.mapping = new Map()
    this.visibilityObserver = new IO((entries) => {
      entries.forEach(entry => {
        entry.target.__is_visible = entry.isIntersecting
      })
    })
  }

  clone (obj) {
    if (obj === null || obj === undefined) {
      return null
    }

    if (typeof obj !== 'object' || obj instanceof Date) {
      return obj
    }

    var clone = new obj.constructor()
    for (var i in obj) {
      if (obj[i] != null && typeof (obj[i]) === 'object') {
        clone[i] = this.clone(obj[i])
      } else {
        clone[i] = obj[i]
      }
    }
    return clone
  }

  deregister (node, property, actor) {
    let map = this.mapping.get(node)

    if (!map) {
      return
    }

    let packet = map.get(property)
    if (packet) {
      packet.actors.delete(actor)
    }
  }

  // TODO: Act on the initial value
  register (node, property, actor) {
    let [filtered, raw, paramKeys] = Silica.getFilteredValue(node, property)
    let value = this.clone(raw)
    let map = this.mapping.get(node)

    if (!map) {
      map = new Map()
      this.mapping.set(node, map)
      this.visibilityObserver.observe(node)
    }

    let packet = map.get(property)
    if (!packet) {
      packet = {
        value: value,
        actors: new Set([actor]),
        params: paramKeys
      }
      map.set(property, packet)
    } else {
      packet.actors.add(actor)
    }
    // TODO: Add listener for DOM removal and deregister

    return filtered
  }

  applyChanges () {
    this.mapping.forEach((map, node) => {
      if (node.__is_visible) {
        map.forEach((packet, property) => {
          let result = Silica.getFilteredValue(node, property, packet.value, packet.params)
          if (result && !Object.is(packet.value, result[1])) {
            packet.value = this.clone(result[1])
            for (let actor of packet.actors.values()) {
              actor.call(node, null, result[0])
            }
          }
        })
      }
    })
  }
}

exports.ValueObserver = ValueObserver
exports.create = function () {
  return new ValueObserver()
}
