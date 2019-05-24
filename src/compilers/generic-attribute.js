/* global NodeFilter, Silica */

goog.module('compilers.generic')

let attributeMappings = {
  'innerhtml': 'innerHTML',
  'innerHtml': 'innerHTML',
  'innerText': 'innerText',
  'disabled': 'disabled'
}

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
    let mapped = attributeMappings[attribute]
    if (mapped) {
      this[mapped] = value
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

exports = Generic
