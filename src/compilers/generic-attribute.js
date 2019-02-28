goog.module('compilers.generic')

function createUpdater (attribute) {
  return function (_, value) {
    if (attribute !== 'innerHTML') {
      this.setAttribute(attribute, value)
    } else {
      this.innerHTML = value
    }
  }
}

function Generic () {
  var nodeList = Silica.query(this, '[data-silica]')
  var node
  var entries
  var comps, attribute, valueKey
  for (let i = nodeList.length - 1; i >= 0; --i) {
    node = nodeList[i]

    if (node._silica_generic) {
      entries = node._silica_generic
    } else {
      entries = node.dataset['silica']
      if (entries.charAt(0) === '[') {
        entries = JSON.parse(entries)
      } else {
        entries = [entries]
      }
      node._silica_generic = entries
    }

    for (let j = entries.length - 1; j >= 0; --j) {
      comps = entries[j].split('=')

      if (comps.length !== 2) {
        console.error('Invalid generic binding', node.dataset['silica'], 'for node', node)
        return
      }

      attribute = comps[0]
      valueKey = comps[1]
      let value = Silica.getValue(node, valueKey)
      if (attribute !== 'innerHTML') {
        node.setAttribute(attribute, value)
      } else {
        node.innerHTML = value
      }
      Silica.observer.register(node, valueKey, createUpdater(attribute))
    }
  }
  Silica._capture_links(this)
}

exports = Generic
