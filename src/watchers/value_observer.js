goog.module('watchers.observer')
const Show = goog.require('compilers.show')

let IO = null

if (typeof window.IntersectionObserver === 'undefined') {
  IO = class {
    constructor (callback) {
      this.callback = callback
    }
    observe (node) {
      this.callback({ 'target': node, 'isIntersecting': true })
    }
  }
} else {
  IO = window.IntersectionObserver
}

class ValueObserver {
  constructor () {
    this.mapping = new Map()
    this.liveNodes = new Set()
    this.hiddenNodes = new Set()
    this.visibilityObserver = new IO((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.liveNodes.add(entry.target)
          this.hiddenNodes.delete(entry.target)
        } else {
          this.liveNodes.delete(entry.target)
          if (entry.target.classList.contains('hidden')) {
            this.hiddenNodes.add(entry.target)
          }
        }
      })
      this.applyChanges()
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

  removeSubTree (tree) {
    this.hiddenNodes.forEach((node) => {
      if (Silica.isChildOf(node, tree)) {
        this.deregister(node)
      }
    })
    this.liveNodes.forEach((node) => {
      if (Silica.isChildOf(node, tree)) {
        this.deregister(node)
      }
    })
    this.deregister(tree)
  }

  deregister (node, property = null, actor = null) {
    let map = this.mapping.get(node)

    if (!map) {
      return
    }

    if (!property && !actor) {
      this.liveNodes.delete(node)
      this.hiddenNodes.delete(node)
      this.mapping.delete(node)
    }

    let packet = map.get(property)
    if (packet) {
      packet.actors.delete(actor)
    }
  }

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
    actor.call(node, null, filtered)
    // TODO: Add listener for DOM removal and deregister

    return filtered
  }

  applyChanges (scope = null) {
    this.hiddenNodes.forEach((node) => {
      if (!scope || node === scope || Silica.isChildOf(node, scope)) {
        this.mapping.get(node).forEach((packet, property) => {
          if (packet.actors.has(Show)) {
            let result = Silica.getFilteredValue(node, property, packet.value, packet.params)
            if (result && !Object.is(packet.value, result[1])) {
              Show.call(node, null, result[0])
              this.liveNodes.add(node)
            }
          }
        })
      }
    })

    this.liveNodes.forEach((node) => {
      if (!scope || node === scope || Silica.isChildOf(node, scope)) {
        this.mapping.get(node).forEach((packet, property) => {
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

exports = ValueObserver
