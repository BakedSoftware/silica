/* global NodeFilter, Silica */

goog.module('compilers.generic')

/**
 * @constructor
 * @implements NodeFilter
 */
function AttributeFilter () {}
AttributeFilter.prototype.acceptNode = function filter (node) {
  let keys = Object.keys(node.dataset)
  return keys.some(function (key) {
    return !key.startsWith('on')
  }) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
}

function createUpdater (attribute) {
  return function (_, value) {
    if (attribute === 'innerHTML' || attribute === 'disabled') {
      this[attribute] = value
    } else {
      this.setAttribute(attribute, value)
    }
  }
}

/** @this Element */
function Generic () {
  var nodes = document.createNodeIterator(this, NodeFilter.SHOW_ELEMENT, new AttributeFilter())
  var node
  while ((node = nodes.nextNode())) {
    for (let key of Object.keys(node.dataset)) {
      if (Silica.ignoredAttributes.has(key)) {
        continue
      }
      if (!key.startsWith('on') || (key.length > 2 && (key.charCodeAt(2) > 90 || key.charCodeAt(2) < 65))) {
        Silica.observer.register(node, node.dataset[key], createUpdater(key))
      }
    }
  }
}

function GenericDeprecated () {
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
      if (attribute === 'innerHTML' || attribute === 'disabled') {
        node[attribute] = value
      } else {
        node.setAttribute(attribute, value)
      }
      Silica.observer.register(node, valueKey, createUpdater(attribute))
    }
  }
  Silica._capture_links(this)
}

exports = Generic
