goog.module('watchers.observer')

class ValueObserver {
  constructor () {
    this.mapping = new Map()
  }

  clone (obj) {
    if (obj === null || obj === undefined) {
      return null
    }

    if (typeof obj !== 'object') {
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

  register (node, property, actor) {
    let value = this.clone(Silica.getFilteredValue(node, property))
    let map = this.mapping.get(node)

    if (!map) {
      map = new Map()
      this.mapping.set(node, map)
    }

    let packet = map.get(property)
    if (!packet) {
      packet = {
        value: value,
        actors: new Set([actor])
      }
      map.set(property, packet)
    } else {
      packet.actors.add(actor)
    }
  }

  applyChanges () {
    this.mapping.forEach((map, node) => {
      map.forEach((packet, property) => {
        let newValue = Silica.getFilteredValue(node, property)
        if (!Object.is(packet.value, newValue)) {
          packet.value = this.clone(newValue)
          for (let actor of packet.actors.values()) {
            actor.call(node, null, newValue)
          }
        }
      })
    })
  }
}

exports.ValueObserver = ValueObserver
exports.create = function () {
  return new ValueObserver()
}
